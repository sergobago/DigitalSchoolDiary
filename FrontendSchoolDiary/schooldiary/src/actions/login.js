import axios from 'axios';
import { url_path_main_server } from './../configurePath';

export const asyncRequestDiaryLogin = (username, password, history) => dispatch => {
    dispatch({ type:"REQUEST_USERTOKEN_STARTING" });
    axios.get(url_path_main_server + '/login?username=' + username + '&password=' + password).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_USERTOKEN_RESULTED", payload: result_payload.tokendata });
                history.push('/lk');
            }else{
                dispatch({ type:"REQUEST_USERTOKEN_RESULTED_WITH_ERROR", payload: result_payload });
            }
        }else{
            dispatch({ type:"REQUEST_USERTOKEN_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_USERTOKEN_ERROR" });
        console.log(error);
    });
};