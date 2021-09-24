import React, { useRef, useState } from 'react';
import { Fragment } from 'react';
import { Task } from './task-component';
import { ConfirmationPopUp } from './confirmation-pop-up-component'
import { v4 as uuidv4 } from "uuid";

export function TaskList() {
    const [itemList, setItemList] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemListHistory, setItemListHistory] = useState([]);

    const taskRef = useRef();

    function createTask() {    
        let currentTask = taskRef.current.value;
        setItemList((prevItemList) => {return [...prevItemList, {id: uuidv4(), body: currentTask, isCompleted: false}]});

        taskRef.current.value = null;
    }

    const completeTask = (id) => {
        let newItemList = [...itemList];
        const currentTask = newItemList.find((current) => current.id ===id);
        
        currentTask.isCompleted = !currentTask.isCompleted;
        setItemList(newItemList);
    }

    function deleteCompletedTask() {
        if(itemList.length > 0) {
            let newItemList = [...itemList];
            const notCompletedTasks = getNotCompletedTasks(newItemList)

            if(haveCompletedTasks(newItemList)){
                setItemList(notCompletedTasks);
                setItemListHistory(newItemList);
                setShowConfirmation(true);
            }
        }
    }

    const confirmDelete = () => {
        setShowConfirmation(false);
    }

    const undoDelete = () => {
        setItemList(itemListHistory);
        setShowConfirmation(false);
    }

    function getNotCompletedTasks(taskList) {
        return taskList.filter((current) => !current.isCompleted);
    }

    function haveCompletedTasks(taskList) {
        return taskList.filter((current) => current.isCompleted).length > 0;
    }

    return(
        <Fragment>
            <div className='create-task'>
                <input type="text" ref={taskRef} />
                <button onClick={() => createTask()}>CREATE</button>
                <button onClick={() => deleteCompletedTask()}>DELETE COMPLETED</button>
                { showConfirmation && <ConfirmationPopUp confirmDelete={confirmDelete} undoDelete={undoDelete} /> }
            </div>

            <div className='task-list-information'>{}
                <p>Completadas: <span className='result'>{itemList.length - getNotCompletedTasks(itemList).length}</span></p>
                <p>Pendientes: <span className='result'>{getNotCompletedTasks(itemList).length}</span></p>
                <p>Total: <span className='result'>{itemList.length}</span></p>
            </div>
            <div className='task-list'>
                { itemList.map((item) => (<Task key={item.id} item={item} completeTask={completeTask} />)) }
            </div>
        </Fragment>
    );
}