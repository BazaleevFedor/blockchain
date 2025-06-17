import styles from './header.module.css';
import {FC} from "react";
import {Profile} from "@/components/profile/Profile";
import Link from "next/link";

const TASK_TYPES = [
    'frontend',
    'backend',
    'SQL',
    'math',
    'arrays',
    'strings',
    'hash Table',
];

type HeaderProps = {
    taskType: string;
    balance: number;
    setTaskType: (type: string) => void;
    onSignOut: () => void;
}

export const Header: FC<HeaderProps> = ({ taskType, setTaskType, balance, onSignOut }) => {
    const handleChange = (e: any) => {
        setTaskType(e.target.value);
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>SkillChain</div>

            <select className={styles.taskType} value={taskType} onChange={handleChange}>
                <option value="" disabled>choice task type</option>

                { TASK_TYPES.map((type, index) => (
                    <option key={index} value={type}>{type}</option>)
                ) }
            </select>

            <Link className={styles.link} href="/certificates">Перейти к сертификатам</Link>

            <Profile balance={balance} onSignOut={onSignOut} />
        </div>
    );
}
