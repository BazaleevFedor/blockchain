import styles from './profile.module.css';
import {FC} from "react";

type ProfileProps = {
    balance: number;
}

export const Profile: FC<ProfileProps> = ({ balance }) => {
    return (
        <>
            <div className={styles.profile}>
                <div className={styles.balance}>{`balance: ${balance}`}</div>
                <div className={styles.title}>profile</div>
            </div>
        </>
    );
}
