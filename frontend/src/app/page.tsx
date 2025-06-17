"use client"

import {useEffect, useState} from "react";
import ajax from "@/app/ajax";

import { Header } from "@/components/header/Header";
import { TaskBlock } from "@/components/taskBlock/TaskBlock";
import { AuthPopup } from "@/components/authPopup/AuthPopup";

export default function Home() {
    const [task, setTask] = useState<string>('');
    const [balance, setBalance] = useState<number>(0);
    const [address, setAddress] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('frontend');
    const [showAuthPopup, setShowAuthPopup] = useState<boolean>(false);

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

    const updateAuthInfo = async () => {
        const isAuth =  ajax.isAuth();
        const address =  await ajax.getUserAddress();

        setShowAuthPopup(!isAuth);
        setAddress(address);
    }

    const handleCloseAuthPopup = () => {
        updateAuthInfo();
    }

    const handleSignOut = () => {
        ajax.signOut();

        updateAuthInfo();
    }

    useEffect(() => {
        updateAuthInfo();

        updateTask();

        setTimeout(updateBalance, 2000);
    }, []);

    useEffect(() => {
        updateTask();
    }, [taskType]);

    return (
        <div>
            <Header taskType={taskType} address={address} balance={balance} setTaskType={setTaskType} onSignOut={handleSignOut}/>

            <TaskBlock task={task} solution={solution} setSolution={setSolution} onSendSolution={onSendSolution} />

            <AuthPopup isOpen={showAuthPopup} onClose={handleCloseAuthPopup} />
        </div>
    );
}
