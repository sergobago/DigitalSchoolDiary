import axios from 'axios';
import { url_path_main_server } from './../configurePath';
import {actionUserDataLogout} from './logout';

export const asyncRequestClasses = (history, token) => dispatch => {
    dispatch({ type:"REQUEST_CLASSES_STARTING" });
    axios.get(url_path_main_server + '/getteacherclasses', { headers: {'jwt-token-x-api-key': token} }).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_CLASSES_RESULTED", payload: result_payload.classes });
            }else{
                dispatch({ type:"REQUEST_CLASSES_RESULTED_WITH_ERROR", payload: result_payload });
                if(result_payload.logout) dispatch(actionUserDataLogout(history));
            }
        }else{
            dispatch({ type:"REQUEST_CLASSES_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_CLASSES_ERROR" });
        console.log(error);
    });
};