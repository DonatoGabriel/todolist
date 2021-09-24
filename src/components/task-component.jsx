import React from 'react';

export function Task({item, completeTask}) {
    const {id, body, isCompleted} = item;
    const handleCompleteTask = () => {completeTask(id)};

    return(
        <div className={isCompleted ? 'task-completed' : 'task'}>
            <span>{body}</span>
            <button disabled={isCompleted} onClick={handleCompleteTask}>Completar</button>
        </div>
    );
}
