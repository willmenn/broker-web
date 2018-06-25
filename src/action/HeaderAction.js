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
    })
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

export const showMessagesAction = function (event) {
    var urlToGetMessages = "https://brokermanagement-dev.herokuapp.com/manager/messages?manager=" + event.manager;
    axiosConfig().get(urlToGetMessages).then(res => {
        dispatcher.dispatch({
            type: 'MESSAGE_DATA',
            data: res.data
        })
    });
}

export const showActiveScheduleAction = function (event) {
    dispatcher.dispatch({
        type: 'ESCALA_CADASTRO'
    })
    var urlToGetScheduleId = "https://brokermanagement-dev.herokuapp.com/manager/schedule?manager=" + event.manager;
    axiosConfig().get(urlToGetScheduleId).then(res => {
        console.log(res.data.scheduleId)
        if(res.data.scheduleId != null) {
            axiosConfig().get('http://broker-scheduler.herokuapp.com/v3/schedules/' + res.data.scheduleId)
                .then(resGet => {
                    resGet.data.scheduleId = res.scheduleId;
                    dispatcher.dispatch({
                        type: 'ESCALA_DATA',
                        data: resGet.data
                    })
                    dispatcher.dispatch({
                        type: 'ESCALA_BROKERS',
                        data: resGet.data.brokerV3s
                    })
                })
            showAllShiftPlacesAction({manager: event.manager, subType: 'GERAR_ESCALA'});
        }else{
            dispatcher.dispatch({
                type: 'NO_ESCALA'
            })
        }
    })
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
