import { createSelector } from "reselect";

const getParametrfindclasses = state => state.findclasses;
const getParametrclasses = state => state.classes;

export const getVisibleTodosClasses = createSelector(
    [getParametrfindclasses, getParametrclasses],
    (pfindclasses, pclasses) => {
        return pclasses.items.filter(item => (item.class_name + ": " + item.subject_name).includes(pfindclasses));
    }
);