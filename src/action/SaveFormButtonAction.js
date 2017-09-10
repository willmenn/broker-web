import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const executeBrokerPost = function (data) {
    var url = "https://brokermanagement-dev.herokuapp.com/broker";

    axiosConfig().post(url, data);
    dispatcher.dispatch({
        type: 'BROKER_BUTTON_SAVE'
    })
}

const executeShiftPlacePost = function(data) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace";

    //TODO missing managersName.
    axiosConfig().post(url, data);
    dispatcher.dispatch({
        type: 'SHIFTPLACE_BUTTON_SAVE'
    })
}


export const saveFormButtonAction = function (action) {
    console.log("saveFormButtonAction")
    switch (action.type) {
        case 'CORRETOR' : {
            executeBrokerPost(action.data);
            break;
        }
        case 'PLANTAO' : {
            executeShiftPlacePost(action.data);
            break;
        }
    }
};

const executeBrokerPut = function (data, id) {
    var url = "https://brokermanagement-dev.herokuapp.com/broker/" + id;

    axiosConfig().put(url, data);
    dispatcher.dispatch({
        type: 'BROKER_BUTTON_EDIT'
    })
}

const executeShiftPlacePut = function (data, id) {
    var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + id;

    axiosConfig().put(url, data);


    dispatcher.dispatch({
        type: 'SHIFTPLACE_BUTTON_EDIT'
    })
}

export const editFormButtonAction = function (action) {
    console.log("edit - saveFormButtonAction")
    switch (action.type) {
        case 'CORRETOR' : {
            executeBrokerPut(action.data, action.id);
            break;
        }
        case 'PLANTAO' : {
            executeShiftPlacePut(action.data, action.id)
            break;
        }
    }

};