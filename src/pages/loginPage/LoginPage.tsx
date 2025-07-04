import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/regex';
import "./LoginPage.css";



export function LoginPage() {
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

        console.log('Creating account', { email, password });
    };

    return (
        <Card handleClose={handleClose}>
            <div className="login-container">
                <h2 className="login-title">Sign up an account</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className={`${emailError ? '' : "form-group"}`}>
                        <label htmlFor="login-email" className="form-label">
                            Email
                        </label>
                        <input
                            id="login-email"
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
                        <label htmlFor="login-password" className="form-label">
                            Password
                        </label>
                        <div className="password-wrapper">
                            <input
                                id="login-password"
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

                    <button type="submit" className="submit-button">
                        Sign In
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account?{' '}
                        <a href="/signup">Sign up</a>
                    </p>
                    <a href="/forgot-password">Forgot password?</a>
                </div>
            </div>
        </ Card >
    );
}