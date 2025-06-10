import styles from './header.module.css';
import {FC} from "react";

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
    setTaskType: (type: string) => void;
}

export const Header: FC<HeaderProps> = ({ taskType, setTaskType }) => {
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

            <div className={styles.profile}>profile</div>
        </div>
    );
}
