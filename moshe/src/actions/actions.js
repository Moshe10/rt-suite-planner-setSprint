export const createProject = (project) => {
    return {type:'CREATE_PROJECT', payload:project}
}
export const taskContainersFromDbToProject = (taskContainers) => {
    return {type:'TASK_CONTAINERS_TO_PROJECT', payload:taskContainers}
}