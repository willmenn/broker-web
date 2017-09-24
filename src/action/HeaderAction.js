import dispatcher from '../Dispatcher';
import axios from 'axios';

const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const fetchBrokersList = function (data) {
    var urlBroker = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + data;
    axiosConfig().get(urlBroker).then(resGet => {
        dispatcher.dispatch({
            type: 'SHOW_ALL_BROKERS',
            data: resGet.data
        })
    });
}

export const homeAction = function () {
    dispatcher.dispatch({
        type: 'HOME_ACTION'
    })
}

export const showAllBrokersAction = function (event) {
    dispatcher.dispatch({
        type: 'SHOW_ALL_BROKERS_LOADING'
    });
    dispatcher.dispatch({
        type: 'SHOW_ALL_BROKERS_ACTION'
    })
    fetchBrokersList(event.manager)
}
