import dispatcher from '../Dispatcher';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const executePost = function (data) {
    var url = "https://brokermanagement-dev.herokuapp.com/broker";

    axiosConfig().post(url, data);
    dispatcher.dispatch({
        type: 'BROKER_BUTTON_SAVE'
    })
}

export const saveFormButtonAction = function (action) {
    console.log("saveFormButtonAction")
    switch (action.type) {
        case 'CORRETOR' : {
            executePost(action.data);
            break;
        }
        case 'PLANTAO' : {

            break;
        }
    }
};

const executePut = function (data, id) {
    var url = "https://brokermanagement-dev.herokuapp.com/broker/" + id;

    axiosConfig().put(url, data);
    dispatcher.dispatch({
        type: 'BROKER_BUTTON_EDIT'
    })
}

export const editFormButtonAction = function (action) {
    console.log("edit - saveFormButtonAction")
    switch (action.type) {
        case 'CORRETOR' : {
            executePut(action.data, action.id);
            break;
        }
        case 'PLANTAO' : {
            break;
        }
    }

};