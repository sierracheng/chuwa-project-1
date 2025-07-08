import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { updatePasswordAPI } from '../../back-end/APITesting/User';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';

export interface ResetPasswordPageProps {
    onClose?: () => void;
}
export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({onClose}) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClose = () => {
        if (onClose) return onClose();
        navigate('/login');
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting reset password form with:', { email, newPassword, confirmPassword });

        if (!email || !newPassword || !confirmPassword) {
            setEmailError('All fields are required');
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            setEmailError('Invalid email format');
            return;
        }
        if (!PASSWORD_REGEX.test(newPassword)) {
            setEmailError('Password must be at least 8 characters long and contain at least one uppercase letter and one lowercase letter');
            return;
        }

        if (newPassword !== confirmPassword) {
            setEmailError('Passwords do not match');
            return;
        }

        try {
            const response = await updatePasswordAPI(email, newPassword);
            console.log('Response from updatePasswordAPI:', response);
            if (response.success) {
                setSuccessMessage('Password updated successfully');
            } else {
                setEmailError(response.error || 'Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setEmailError('An error occurred while updating the password');
        }
    };


    return (
        <Card handleClose={handleClose}>
                <h2 className="text-xl font-bold mb-4">Reset your password</h2>
                {successMessage ? (
                    <div>
                    <div className="text-green-600 mb-4">{successMessage}</div>
                    <div className="text-gray-600 mb-4">Click login to redirect to <Link to="/login" className="text-blue-600">login</Link>...</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-400 rounded-md text-base outline-none bg-white text-black focus:border-gray-700 focus:ring-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-gray-400 rounded-md text-base outline-none bg-white text-black focus:border-gray-700 focus:ring-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-400 rounded-md text-base outline-none bg-white text-black focus:border-gray-700 focus:ring-2"
                            />
                        </div>
                        {emailError && (
                            <div className="text-red-600">{emailError}</div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

        </Card>
    );
}
