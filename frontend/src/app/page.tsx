"use client"

import {useEffect, useState} from "react";
import ajax from "@/app/ajax";

import { Header } from "@/components/header/Header";
import { TaskBlock } from "@/components/taskBlock/TaskBlock";

export default function Home() {
    const [task, setTask] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);
    const [solution, setSolution] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('frontend');

    const updateTask = async () => {
        const newTask = await ajax.getTask(taskType);

        setTask(newTask);
        setSolution('');
    }

    const updateBalance = async () => {
        const userBalance = await ajax.getUserPoints();

        setBalance(userBalance);
    }

    const onSendSolution = async () => {
        const point = await ajax.verifyTask(task, solution);

        await ajax.rewardUser(point);

        updateTask();
        updateBalance();
    }

    useEffect(() => {
        updateTask();

        setTimeout(updateBalance, 2000);
    }, []);

    useEffect(() => {
        updateTask();
    }, [taskType]);

    return (
        <div>
            <Header taskType={taskType} balance={balance} setTaskType={setTaskType}/>

            <TaskBlock task={task} solution={solution} setSolution={setSolution} onSendSolution={onSendSolution} />
        </div>
    );
}
