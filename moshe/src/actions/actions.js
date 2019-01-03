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
export function saveResulutionFromHomePage(resolution) {
    return { type: "SAVE_RESULUTION", resolution: resolution }
}
export function startProject(date) {
    return { type: "START_PROJECT", date: date }
}
export function setWeeksOfProject(name,len) {
    return { type: "SET_WEEKS_PROJECT", payload: {length:len,proName:name} }
}
export function updateToggleSetSprinToFalse(sprintnum) {
    return { type: "UPDATE_TOGGLE_SET_SPRINT_TO_FALSE",payload:sprintnum }
}
export function updateToggleSetSprinToTrue() {
    return { type: "UPDATE_TOGGLE_SET_SPRINT_TO_TRUE" }
}
export function updateWeekInTaskContainer(index, week) {
    return { type: "UPDATE_WEEK_IN_TASK_CONT", payload:{index:index, week:week} }
}
export function plusToTaskOnWork(fatherIndex, index) {
    return { type: "PLUS_TO_TASK_ON_WORK", payload:{contIndex:fatherIndex, taskIndex:index} }
}
export function minusToTaskOnWork(fatherIndex, index) {
    return { type: "MINUS_TO_TASK_ON_WORK", payload:{contIndex:fatherIndex, taskIndex:index} }
}
export function fillTaskOnWorkArr(arr) {
    return { type: "FILL_TASK_ON_WORK_ARR", payload:arr }
}
export function selectDevToCont(dev,contIndex,bool) {
    return { type: "SELECT_DEV_TO_CONT", payload:{developer:dev,index:contIndex,bool:bool} }
}
export function lockSprint(contIndex,taskIndex) {
    return { type: "LOCK_SPRINT", payload:{contIndex:contIndex,taskIndex:taskIndex} }
}
export function updateSprintNumInTask(contIndex,taskIndex,sprintNum) {
    return { type: "UPDATE_SPRINT_NUM_IN_TASK", payload:{contIndex:contIndex,taskIndex:taskIndex,sprintNum:sprintNum} }
}
export function fillZerosIntaskOnWorkArrInStore(zeroArr) {
    return { type: "ZEROS_IN_TASK_ON_WORK_ARR",payload:{arr:zeroArr} }
}

