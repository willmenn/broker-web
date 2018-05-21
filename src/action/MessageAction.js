import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

export const saveMessage = function (message,manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/manager/messages?manager=" + manager+"&message="+message;
    axiosConfig().post(url).then(res => {
        dispatcher.dispatch({
            type: "MESSAGE_DATA",
            data: res.data
        })
    });
};