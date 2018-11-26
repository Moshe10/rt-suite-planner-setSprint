// this func take task from bank tasks and send it to the todo tasks (and remove from bank tasks).
export function sendToTodoTasks(task, i){
    return{type:'SEND_TO_TODO_TASK',payload: {task:task, index:i}}
}