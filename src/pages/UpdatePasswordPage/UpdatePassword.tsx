import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { updatePasswordAPI } from '../../back-end/APITesting/User';
import { Link } from 'react-router-dom';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';
import './UpdatePassword.css';

export interface UpdatePasswordPageProps {
    onClose?: () => void;
}
export const UpdatePasswordPage: React.FC<UpdatePasswordPageProps> = ({onClose}) => {
    const navigate = useNavigate();
    const { email: urlEmail, token } = useParams<{email: string, token: string}>();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        console.log('UpdatePasswordPage mounted with params:', { urlEmail, token });
        if (urlEmail) {
            setEmail(decodeURIComponent(urlEmail));
        }
    }, [urlEmail, token]);

    const handleClose = () => {
        if (onClose) return onClose();
        navigate('/login');
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting reset password form with:', { email, newPassword, confirmPassword, token });

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
            const response = await updatePasswordAPI(email, newPassword, token || '');
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
        <Card handleClose={handleClose} className='update-password-card'>
                <h2 className="reset-title">Reset your password</h2>
                {successMessage ? (
                    <div>
                    <div className="success-message">{successMessage}</div>
                    <div className="redirect-message">Click login to redirect to <Link to="/login" className="login-link">login</Link>...</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="reset-form custom-reset-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                readOnly
                                className="form-input readonly-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-input password-input"
                            />
                            <button
                                type="button"
                                className="show-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? 'Hide' : 'Show'}</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <div className="password-input-container"> 
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-input password-input"
                            />
                            <button
                                type="button"
                                className="show-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >{showConfirmPassword ? 'Hide' : 'Show'}</button>
                            </div>
                        </div>
                        {emailError && (
                            <div className="error-message">{emailError}</div>
                        )}
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Update Password
                        </button>
                    </form>
                )}

        </Card>
    );
}
