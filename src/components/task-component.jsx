import React from 'react';

export function Task({item, completeTask}) {
    const {id, body, isCompleted} = item;
    const handleCompleteTask = () => {completeTask(id)};

    return(
        <div className={isCompleted ? 'task-completed' : 'task'}>
            <input type='checkbox' onChange={handleCompleteTask} checked={isCompleted}/>
            <span>{body}</span>
        </div>
    );
}
