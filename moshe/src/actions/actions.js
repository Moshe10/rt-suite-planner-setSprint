export const createProject = (project) => {
    return {type:'CREATE_PROJECT', payload:project}
}
export const taskContainersFromDbToProject = (taskContainers) => {
    return {type:'TASK_CONTAINERS_TO_PROJECT', payload:taskContainers}
}
export const createSprints = (sprintNum) => {
    return {type:'CREATE_SPRINT', payload:sprintNum}
}
export const saveData = () => {
    return {type:'SAVE_DATA'}
}
export function DeleteLast() {
    return { type: "DELETE_LAST" }
}
export function DeleteAll() {
    return { type: "DELETE_ALL" }
}
export function saveResulutionFromHomePage(resulution) {
    return { type: "SAVE_RESULUTION", resulution: resulution }
}
export function startProject(date) {
    return { type: "START_PROJECT", date: date }
}
