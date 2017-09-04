import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

export const saveSchedule = function (data) {
    console.log("saveSchedule")

    var url = "http://brokermanagement-dev.herokuapp.com/manager?manager="
        + data.manager + "&scheduleId=" + data.scheduleId;

    axiosConfig().put(url, data).then(res => {
        console.log("ESCALA_SAVE: " + res);
        dispatcher.dispatch({
            type: 'ESCALA_SAVE'
        })
    })
};
