import dispatcher from "../Dispatcher";
import axios from "axios/index";

const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

export function createScheduleTabAction(id) {
        dispatcher.dispatch({
            type: 'ESCALA_CORRETOR',
            data: ''
        })
}