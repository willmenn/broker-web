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

const fecthBrokersList = function(data) {
    var urlBroker = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + data.manager;
    axiosConfig().get(urlBroker).then(resGet => {
        dispatcher.dispatch({
            type: 'ESCALA_BROKERS',
            data: resGet.data
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
