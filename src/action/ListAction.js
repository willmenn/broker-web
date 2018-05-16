import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const fetchBroker = function (type, id) {
    var url = "https://brokermanagement-dev.herokuapp.com/broker/" + id;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}

const fetchShiftPlace = function (type, id) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + id;
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: type,
            data: res.data
        })
    });
}


export const editEntity = function (data) {
    switch (data.entity) {
        case 'PLANTAO_EDIT' : {
            fetchShiftPlace(data.entity+ '_LIST',data.id)
            break;
        }
        case 'CORRETOR_EDIT' : {
            fetchBroker(data.entity+'_LIST',data.id);
            break;
        }
    }
};
1