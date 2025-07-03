import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { EMAIL_REGEX } from '../../utils/regex';
import './UpdatePassword.css';


export function UpdatePassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState('');

    const handleClose = () => {
        navigate(-1);
    };

    const validateEmail = (value: string) => {
        if (!EMAIL_REGEX.test(value)) {
            setEmailError('Invalid email input!');
            return false;
        }
        setEmailError('');
        return true;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailOK = validateEmail(email);

        if (!emailOK) {
            return;
        }

        console.log('Creating account', { email });
    };


    return (
        <Card handleClose={handleClose}>
            <div className="login-container">
                <h2 className="signup-title">Update your password</h2>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="signup-email" className="form-label">
                            Email
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            className={`form-input ${emailError ? 'invalid' : ''}`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={e => validateEmail(e.target.value)}
                        />
                        {emailError && <small className="error-text">{emailError}</small>}
                    </div>


                    <button type="submit" className="submit-button">
                        Update password
                    </button>
                </form>
            </div>
        </Card>
    );
}
