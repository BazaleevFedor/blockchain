import styles from './taskBlock.module.css';
import {FC} from "react";

type TaskBlockProps = {
    task: string;
    solution: string;
    setSolution: (solution: string) => void;
    onSendSolution: () => void;
}

export const TaskBlock: FC<TaskBlockProps> = ({ task, solution, setSolution, onSendSolution }) => {
    const handleClick = (e: any) => {
        setSolution(e.target.value);
    };

    return (
        <div className={styles.taskBlock}>
            <h3>task</h3>
            <div className={styles.task}>{task}</div>

            <h3>you solution</h3>
            <textarea className={styles.userCode} value={solution} onChange={handleClick}></textarea>

            <button className={styles.button} onClick={onSendSolution}>send solution</button>
        </div>
    );
}
