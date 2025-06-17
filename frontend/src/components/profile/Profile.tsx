import styles from './profile.module.css';
import {FC} from "react";

type ProfileProps = {
    balance: number;
    onSignOut: () => void;
}

export const Profile: FC<ProfileProps> = ({ balance, onSignOut }) => {
    return (
        <>
            <div className={styles.profileWrapper}>
                <div className={styles.profile}>
                    <div className={styles.balance}>{`balance: ${balance}`}</div>
                    <button className={styles.signOut} onClick={onSignOut}>{'sign out'}</button>
                </div>

                <div className={styles.title}>profile</div>
            </div>
        </>
    );
}
