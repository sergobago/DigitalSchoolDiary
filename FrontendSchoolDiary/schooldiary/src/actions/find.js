export const actionFindClassmates = (findstr) => {
    return { type: "FIND_STR_CLASSMATES", payload: findstr }
};

export const actionFindStudentSubjects = (findstr) => {
    return { type: "FIND_STR_STUDENT_SUBJECTS", payload: findstr }
};

export const actionFindClassStudents = (findstr) => {
    return { type: "FIND_STR_CLASS_STUDENTS", payload: findstr }
};

export const actionFindClasses = (findstr) => {
    return { type: "FIND_STR_CLASSES", payload: findstr }
};