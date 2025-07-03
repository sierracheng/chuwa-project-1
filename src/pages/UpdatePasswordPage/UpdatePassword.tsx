import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdatePassword.css';
import { CloseButton } from '../../components/closeButton';


export interface UpdatePasswordProps {
    onClose?: () => void;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    // const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Requesting password reset for email:", email);
    };

    const handleClose = () => {
        if(onClose) return onClose;
        navigate('/login');
    }

    return (
        <div className='update-card-overlay'>
            <div className='update-card'>
                <CloseButton onClick={handleClose} />
                <h2 className='update-title'>Update your password</h2>
                <p className='update-subtext'>Enter your email link, we will send you the recovery link</p>

                <form className='update-form' onSubmit={handleSubmit}>
                    <label htmlFor='update-email' className='update-label'>
                        Email
                    </label>
                    <input 
                        id="update-email"
                        type="email"
                        className='update-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className='update-button'>Update Password</button>
                </form>
            </div>
        </div>
    );

};