import dispatcher from '../Dispatcher';
import axios from 'axios';

const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

export const loginAction = function (data) {
    var url = "http://brokermanagement-dev.herokuapp.com/manager?manager="
        + data.manager + "&pass=" + data.password;
    dispatcher.dispatch({
        type: 'LOGIN_LOADING'
    })
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: 'LOGIN_MANAGER',
            data: res.data
        })
    }).catch(function () {
        var url_broker ="http://brokermanagement-dev.herokuapp.com/broker?name="
            + data.manager + "&password=" + data.password;
        axiosConfig().get(url_broker).then(res => {
            dispatcher.dispatch({
                type: 'LOGIN_BROKER',
                data: res.data
            })
        })
    });

};
