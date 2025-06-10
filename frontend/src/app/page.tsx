"use client"

import styles from './home.module.css'
import {useEffect, useState} from "react";
import ajax from "@/app/ajax";

import { Header } from "@/components/header/Header";
import { TaskBlock } from "@/components/taskBlock/TaskBlock";

export default function Home() {
    const [task, setTask] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('frontend');

    const updateTask = async () => {
        const newTask = await ajax.getTask(taskType);

        setTask(newTask);
        setSolution('');
    }

    const onSendSolution = async () => {
        const point = await ajax.verifyTask(task, solution);

        alert(point);

        updateTask();
    }

    useEffect(() => {
        updateTask();
    }, []);

    return (
        <div className={styles.home}>
            <Header taskType={taskType} setTaskType={setTaskType}/>

            <TaskBlock task={task} solution={solution} setSolution={setSolution} onSendSolution={onSendSolution} />
        </div>
    );
}
