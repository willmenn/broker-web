import dispatcher from "../Dispatcher";
import axios from "axios/index";

const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

export function createScheduleTabAction(id) {
    var url = "https://broker-scheduler.herokuapp.com/v2/schedule/" + id +"/broker";
    axiosConfig().get(url).then(res => {
        dispatcher.dispatch({
            type: 'ESCALA_CORRETOR',
            data: res.data
        })
    });
}