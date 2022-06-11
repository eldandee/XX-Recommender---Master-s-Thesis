export const createActionSet = (actionName: string) => ({
    REQUESTED: `${actionName}_REQUESTED`,
    SUCCESS: `${actionName}_SUCCESS`,
    ERROR: `${actionName}_ERROR`,
    CLEAR: `${actionName}_CLEAR`,
    ACTION: actionName,
});
