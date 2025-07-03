import React from 'react';
import './SuccessfulPage.css';
import { icons } from '../../constants/icons';
import { CloseButton } from '../../components/closeButton';

export interface SuccessfulPageProps {
    onClose?: ()=>void;
}

export const SuccessfulPage : React.FC<SuccessfulPageProps> = ({ onClose }) => {
    return (
        <div className="successful-page">
            <div className='success-card'>
                <CloseButton onClick={onClose || (()=> window.location.reload)} />
                <div className='success-icon'>
                    {icons.EMAIL_SUCCESS}
                </div>
                <p className='success-message'>
                    We have sent the update password link to your email, please check that!
                </p>
            </div>
        </div>
    );
};