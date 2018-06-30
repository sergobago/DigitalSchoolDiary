import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import usertoken from './usertoken';
import userdata from './userdata';
import classmates from './classmates';
import findclassmates from './findclassmates';
import classes from './classes';
import findclasses from './findclasses';
import studentsubjects from './studentsubjects';
import findstudentsubjects from './findstudentsubjects';
import diary from './diary';
import finddiary from './finddiary';

const MainReducers = combineReducers({
    routing: routerReducer,
    form: formReducer,
    usertoken,
    userdata,
    classmates,
    findclassmates,
    classes,
    findclasses,
    studentsubjects,
    findstudentsubjects,
    diary,
    finddiary
});

export default MainReducers;