import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './template/header'

import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import ListComponent from './components/ListComponent';
import ShiftPlaceFormComponent from './components/ShiftPlaceFormComponent';
import BrokerFormComponent from './components/BrokerFormComponent';
import ScheduleComponent from './components/ScheduleComponent';
import './index.css';

import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}


class App extends Component {

    constructor() {
        super();
        this.state = {
            isHomeVisible: true,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: false,
            brokerPanelVisible: false,
            scheduleVisible: false,
            managerName: 'MTest',
            schedulePanelVisible: false,
            scheduleData: {weekSchedule: {dayScheduleList: [{brokers: []}]}}
        };
    }


    onClickRegisterShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: true,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: false,
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            },
            edit: false
        });
        refreshReact();
    }

    onClickRegisterBroker() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: true,
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            },
            brokerData: {
                name: "Nome do Corretor"
            },
            edit: false
        });
        refreshReact();
    }

    onClickHomeHeader() {
        this.setState({
            isHomeVisible: true,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            isBrokerFormVisible: false,
            scheduleVisible: false
        });
        refreshReact();
    }

    onClickEditShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: true,
            shiftPlacePanelVisible: true,
            listOptions: {title: 'Plantões', action: 'Edit'},
            listData: [],
            isBrokerFormVisible: false,
        });

        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + this.state.managerName;
        axiosConfig().get(url).then(res => {
            this.setState({listData: res.data});
            refreshReact();
        });
    }

    onClickEditBroker() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: true,
            brokerPanelVisible: true,
            shiftPlacePanelVisible: false,
            listOptions: {title: 'Corretores', action: 'Edit', entity: 'broker'},
            listData: [],
            isBrokerFormVisible: false,
        });

        var url = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + this.state.managerName;
        axiosConfig().get(url).then(res => {
            this.setState({listData: res.data});
            refreshReact();
        });
    }

    onClickPanelLine(id, entity) {
        if (entity === 'broker') {
            this.setState({
                isHomeVisible: false,
                isShiftPlaceFormVisible: false,
                isListComponentVisible: false,
                shiftPlacePanelVisible: false,
                brokerData: {
                    name: "Nome do Corretor"
                },
                edit: true,
                isBrokerFormVisible: true,
                brokerPanelVisible: false
            });

            var url = "https://brokermanagement-dev.herokuapp.com/broker/" + id;
            axiosConfig().get(url).then(res => {
                this.setState({brokerData: res.data});
                refreshReact();
            });
        } else {
            this.editShiftPlace(id);
        }
    }

    editShiftPlace(id) {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: true,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            },
            edit: true,
            isBrokerFormVisible: false,
        });

        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + id;
        axiosConfig().get(url).then(res => {
            this.setState({shiftPlaceData: res.data});
            refreshReact();
        });
    }

    onClickDeleteShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: true,
            shiftPlacePanelVisible: true,
            listOptions: {title: 'Plantões', action: 'Delete'},
            listData: [],
            isBrokerFormVisible: false,
        });
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + this.state.managerName;
        axiosConfig().get(url).then(res => {
            console.log(this.state.listData)
            this.setState({listData: res.data});
            refreshReact();
        });
    }

    onClickDeleteBroker() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: true,
            shiftPlacePanelVisible: false,
            listOptions: {title: 'Corretores', action: 'Delete', entity: 'broker'},
            listData: [],
            isBrokerFormVisible: false,
            brokerPanelVisible: true
        });
        var url = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + this.state.managerName;
        axiosConfig().get(url).then(res => {
            console.log(this.state.listData)
            this.setState({listData: res.data});
            refreshReact();
        });

    }

    onClickCreateAndFetchSchedule() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            listOptions: {title: 'Corretores', action: 'Delete', entity: 'broker'},
            listData: [],
            isBrokerFormVisible: false,
            brokerPanelVisible: false,
            schedulePanelVisible: true,
            scheduleVisible: true,
            scheduleData: {"fake": "fake"},
            brokers: []

        });
        var url = "http://broker-scheduler.herokuapp.com/schedule";
        let data = {manager: this.state.managerName};
        axiosConfig().post(url, data).then(res => {
            console.log(res);
            axiosConfig().get('http://broker-scheduler.herokuapp.com/schedule/broker?id=' + res.data.scheduleId + '&manager=' + this.state.managerName).then(resGet => {
                this.setState({scheduleData: resGet.data});
                console.log(this.state.scheduleData);
            })
        })
        var urlBroker = "https://brokermanagement-dev.herokuapp.com/brokers/manager/" + this.state.managerName;
        axiosConfig().get(urlBroker).then(res => {
            this.setState({brokers: res.data});
        });
        refreshReact();
    }


    render() {
        return (
            <div>
                <HeaderComponent onClickHomeHeader={this.onClickHomeHeader.bind(this)}/>
                <AppComponent>
                    { this.state.isHomeVisible || this.state.shiftPlacePanelVisible ?
                        <PanelComponent cardTitle='Plantão'
                                        onClickRegisterShiftPlace={this.onClickRegisterShiftPlace.bind(this)}
                                        onClickEditShiftPlace={this.onClickEditShiftPlace.bind(this)}
                                        onClickDeleteShiftPlace={this.onClickDeleteShiftPlace.bind(this)}/> : null}
                    { this.state.isHomeVisible || this.state.brokerPanelVisible ? <PanelComponent
                        onClickRegisterShiftPlace={this.onClickRegisterBroker.bind(this)}
                        onClickEditShiftPlace={this.onClickEditBroker.bind(this)}
                        onClickDeleteShiftPlace={this.onClickDeleteBroker.bind(this)}
                        cardTitle='Corretor'/> : null }
                    { this.state.isHomeVisible || this.state.schedulePanelVisible ?
                        <PanelComponent onClickRegisterShiftPlace={this.onClickCreateAndFetchSchedule.bind(this)}
                                        cardTitle='Escala'/> : null}
                    { this.state.isShiftPlaceFormVisible ?
                        <ShiftPlaceFormComponent shiftPlaceData={this.state.shiftPlaceData} edit={this.state.edit}
                                                 managersName={this.state.managerName}/> : null}
                    { this.state.isBrokerFormVisible ?
                        <BrokerFormComponent brokerData={this.state.brokerData} edit={this.state.edit}
                                             managersName={this.state.managerName}/> : null}
                    { this.state.isListComponentVisible ? <ListComponent
                        listOptions={this.state.listOptions}
                        listData={this.state.listData}
                        onClickPanelLine={this.onClickPanelLine.bind(this)}
                    /> : null}
                    {this.state.scheduleVisible ? <ScheduleComponent brokers={this.state.brokers}
                                                                     scheduleWrapper={this.state.scheduleData}/> : null}
                </AppComponent>
            </div>
        )
    }
}

const refreshReact = () => {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}

refreshReact();
