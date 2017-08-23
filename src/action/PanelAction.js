import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const createSchedule = function (data) {
    console.log("createSchedule")
    var url = "http://broker-scheduler.herokuapp.com/schedule";
    axiosConfig().post(url, data).then(res => {
        console.log(res);
        axiosConfig().get('http://broker-scheduler.herokuapp.com/schedule/broker?id=' + res.data.scheduleId + '&manager=' + data.manager)
            .then(resGet => {
                dispatcher.dispatch({
                    type: 'ESCALA_DATA',
                    data: resGet.data
                })
                console.log(resGet.data);
            })
    })
};

const fecthBrokersList = function (data) {
    var urlBroker = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + data.manager;
    axiosConfig().get(urlBroker).then(resGet => {
        dispatcher.dispatch({
            type: 'ESCALA_BROKERS',
            data: resGet.data
        })
    });
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
            dispatcher.dispatch({
                type: 'CORRETOR_CADASTRO'
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
            fecthBrokersList(data);
            break;
        }
    }
}

export function deletePanelAction(event) {
    console.log('delete: ' + event.type)
    switch (event.type) {
        case 'CORRETOR' : {
            fetchBrokerList(event.type + '_DELETE', event.manager);
            break;
        }
        case 'PLANTAO' : {
            fetchSchiftPlaceList(event.type + '_DELETE', event.manager)
            break;
        }
    }
}

export function editPanelAction(event) {
    console.log('delete: ' + event.type)
    switch (event.type) {
        case 'CORRETOR' : {
            fetchBrokerList(event.type + '_EDIT', event.manager);
            break;
        }
        case 'PLANTAO' : {
            fetchSchiftPlaceList(event.type + '_EDIT', event.manager)
            break;
        }
    }
}
