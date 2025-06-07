import styles from './home.module.css'

import Header from "@/components/header/Header";
import TaskBlock from "@/components/taskBlock/TaskBlock";

export default function Home() {
    return (
        <div className={styles.home}>
            <Header />

            <TaskBlock />
        </div>
    );
}
