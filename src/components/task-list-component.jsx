import React, { useRef, useState } from 'react';
import { Fragment } from 'react';
import { Task } from './task-component';
import { v4 as uuidv4 } from "uuid";

export function TaskList() {
    const [itemList, setItemList] = useState([]);
    const taskRef = useRef();

    function createTask() {    
        let currentTask = taskRef.current.value;
        setItemList((prevItemList) => {return [...prevItemList, {id: uuidv4(), body: currentTask, isCompleted: false}]});

        taskRef.current.value = null;
    }

    const completeTask = (id) => {
        let newItemList = [...itemList];
        const currentTask = newItemList.find((current) => current.id ===id);
        
        currentTask.isCompleted = true;
        setItemList(newItemList);
    }

    function deleteCompletedTask() {
        let newItemList = [...itemList];
        const notCompletedTasks = getNotCompletedTasks(newItemList)

        setItemList(notCompletedTasks);
    }

    function getNotCompletedTasks(taskList) {
        return taskList.filter((current) => !current.isCompleted);
    }

    return(
        <Fragment>
            <div className='create-task'>
                <input type="text" ref={taskRef} />
                <button onClick={() => createTask()}>Create</button>
                <button onClick={() => deleteCompletedTask()}>Delete completed</button>
            </div>
            <div className='task-list-information'>{}
                <p>Completadas: {itemList.length - getNotCompletedTasks(itemList).length}</p>
                <p>Pendientes: {getNotCompletedTasks(itemList).length}</p>
                <p>Total: {itemList.length}</p>
            </div>
            <div className='task-list'>
                { itemList.map((item) => (<Task key={item.id} item={item} completeTask={completeTask} />)) }
            </div>
        </Fragment>
    );
}