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
    }).catch(function () {
        dispatcher.dispatch({
            type: 'SHOW_ALL_BROKERS_LOADING'
        });
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

const fetchSchiftPlaceList = function (manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + manager;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: 'SHOW_ALL_SHIFT_PLACES',
            data: res.data
        })
    }).catch(function () {
        dispatcher.dispatch({
            type: 'SHOW_ALL_SHIFT_PLACES_LOADING'
        });
    });
}

export const showAllShiftPlacesAction = function (event) {
    if (!event.subType) {
        dispatcher.dispatch({
            type: 'SHOW_ALL_SHIFT_PLACES_LOADING'
        });
        dispatcher.dispatch({
            type: 'SHOW_ALL_SHIFT_PLACES_ACTION'
        });
    }

    fetchSchiftPlaceList(event.manager)
}

export const showScheduleListAction = function (event) {
        dispatcher.dispatch({
            type: 'SHOW_LIST_SCHEDULE_LOADING'
        });
        dispatcher.dispatch({
            type: 'SHOW_LIST_SCHEDULE_ACTION'
        });

    fetchScheduleList(event.manager);
}

const fetchScheduleList = function (manager) {
    var url = "https://broker-scheduler.herokuapp.com/v3/schedules/manager/" + manager;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: 'SHOW_LIST_SCHEDULE',
            data: res.data
        })
    }).catch(function () {
        dispatcher.dispatch({
            type: 'SHOW_LIST_SCHEDULE_LOADING'
        });
    });
}
