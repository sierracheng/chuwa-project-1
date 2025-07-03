import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';
import './SignUpPage.css';
import { createUserAPI, type UserData } from '../../back-end/APITesting/User';


export function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const validatePassword = (value: string) => {
        if (!PASSWORD_REGEX.test(value)) {
            setPasswordError(
                'Invalid password input!'
            );
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailOK = validateEmail(email);
        const passwordOK = validatePassword(password);

        if (!emailOK || !passwordOK) {
            return;
        }

        const userData: UserData = {
            email: email,
            password: password,
            role: 'rou'
        }
        const response = createUserAPI(userData)

        console.log(response)

        console.log('Creating account', { email, password });
    };

    const [isSeller, setIsSeller] = useState(false);

    return (
        <Card handleClose={handleClose}>
            <div className="login-container">
                <h2 className="signup-title">Sign up an account</h2>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className={`${emailError ? '' : "form-group"}`}>
                        <label htmlFor="signup-email" className="form-label">
                            Email
                        </label>
                        <input
                            id="signup-email"
                            type="text"
                            className={`form-input ${emailError ? 'invalid' : ''}`}
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        //onBlur={e => validateEmail(e.target.value)}
                        />
                        {emailError && <small className="error-text">{emailError}</small>}
                    </div>


                    <div className={`${passwordError ? '' : "form-group"}`}>
                        <label htmlFor="signup-password" className="form-label">
                            Password
                        </label>
                        <div className="password-wrapper">
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                className={`form-input ${passwordError ? 'invalid' : ''}`}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            // onBlur={e => validatePassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="show-button"
                                onClick={() => setShowPassword(v => !v)}
                                tabIndex={-1}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {passwordError && (
                            <small className="error-text">{passwordError}</small>
                        )}
                    </div>

                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isSeller}
                                onChange={e => setIsSeller(e.target.checked)}
                                className="form-checkbox"
                            />
                            Are you a seller?
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Create account
                    </button>
                </form>

                <div className="signup-footer">
                    <p>
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </div>
            </div>
        </Card>
    );
}
