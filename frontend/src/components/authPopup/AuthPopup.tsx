'use client';

import {useState, useEffect, FC} from 'react';
import ajax from '../../app/ajax';
import styles from './AuthPopup.module.css';

interface AuthPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthPopup: FC<AuthPopupProps> = ({ isOpen, onClose }) => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkAuthAndAddress = async () => {
            const isAuth = await ajax.isAuth();
            if (!isAuth) {
                const address = await ajax.getUserAddress();
                setUserAddress(address);
            }
        };

        checkAuthAndAddress();
    }, [isOpen]);

    const handleSignIn = async () => {
        if (userAddress === 'кошелек не обнаружен') return;

        setIsLoading(true);
        try {
            ajax.signIn();

            onClose();
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Залогиниться через MetaMask?</h2>

                    <div className={styles.addressInfo}>
                        <span className={styles.label}>Адрес вашего кошелька:</span>
                        <span className={styles.address}>{userAddress}</span>
                    </div>

                    {userAddress !== 'кошелек не обнаружен' && (
                        <button
                            className={styles.signInButton}
                            onClick={handleSignIn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Загрузка...' : 'Залогиниться'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
