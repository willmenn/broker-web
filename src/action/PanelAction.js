import dispatcher from '../Dispatcher';
import axios from 'axios';
import * as HeaderAction from "./HeaderAction";


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json"}
    });
}

const createSchedule = function (data) {
    console.log("createSchedule")
    var url = "http://broker-scheduler.herokuapp.com/v3/schedules?manager=" + data.manager;
    axiosConfig().post(url,data).then(res => {
        console.log(res);
        fetchSchedule({scheduleId: res.data.id, manager: data.manager});
    })
};

const fetchSchedule = function (data) {
    axiosConfig().get('http://broker-scheduler.herokuapp.com/v3/schedules/' + data.scheduleId)
        .then(resGet => {
            resGet.data.scheduleId = resGet.data.id;
            dispatcher.dispatch({
                type: 'ESCALA_DATA',
                data: resGet.data
            })
            dispatcher.dispatch({
                type: 'ESCALA_BROKERS',
                data: resGet.data.brokerV3s
            })
            console.log(resGet.data);
        })
}

const fetchBrokerList = function (type, manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + manager;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}

const fetchSchiftPlaceList = function (type, manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + manager;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}

export function createPanelAction(event) {
    console.log(event.type)

    switch (event.type) {
        case 'PLANTAO' : {
            dispatcher.dispatch({
                type: 'PLANTAO_CADASTRO'
            })
            break;
        }
        case 'CORRETOR' : {
            fetchSchiftPlaceList('CORRETOR_CADASTRO', event.manager);
            dispatcher.dispatch({
                type: 'BROKER_BUTTON_RESET'
            })
            break;
        }
        case 'ESCALA' : {
            dispatcher.dispatch({
                type: 'ESCALA_CADASTRO'
            })
            let data = {manager: event.manager};
            console.log(data);
            createSchedule(data);
            HeaderAction.showAllShiftPlacesAction({manager: event.manager, subType: 'GERAR_ESCALA'});
            break;
        }
        case 'ESCALA_VISUALIZATION' : {
            dispatcher.dispatch({
                type: 'ESCALA_CADASTRO'
            });
            let data = {manager: event.manager, scheduleId: event.scheduleId};
            console.log(data);
            fetchSchedule(data);
            HeaderAction.showAllShiftPlacesAction({manager: event.manager, subType: 'GERAR_ESCALA'});
            break;
        }
    }
}

const fetchBrokerCount = function (type, manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + manager + "/count";
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}


const fetchShiftPlaceCount = function (type, manager) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + manager + "/count";
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}


export function createPanelCountAction(event) {
    console.log(event.type)

    switch (event.type) {
        case 'PLANTAO' : {
            console.log("PANEL COUNT");
            console.log(event);
            fetchShiftPlaceCount('PLANTAO_COUNT', event.manager);
            break;
        }
        case 'CORRETOR' : {
            fetchBrokerCount('CORRETOR_COUNT', event.manager);
            break;
        }
    }
}

export function deletePanelAction(event) {
    console.log('delete: ' + event.type);
    switch (event.type) {
        case 'CORRETOR' : {
            fetchBrokerList(event.type + '_DELETE', event.manager);
            break;
        }
        case 'PLANTAO' : {
            fetchSchiftPlaceList(event.type + '_DELETE', event.manager);
            break;
        }
    }
}

export function editPanelAction(event) {
    console.log('delete: ' + event.type);
    switch (event.type) {
        case 'CORRETOR' : {
            fetchBrokerList(event.type + '_EDIT', event.manager);
            break;
        }
        case 'PLANTAO' : {
            fetchSchiftPlaceList(event.type + '_EDIT', event.manager);
            break;
        }
    }
}
