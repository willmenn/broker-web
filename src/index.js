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

import PanelStore from './store/PanelStore'
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}


class App extends Component {

    constructor() {
        super();
        this.state = {panel: PanelStore.getAll()}
    }

    componentWillMount() {
        PanelStore.on('change', () => {
            console.log("change")
            this.setState({panel :PanelStore.getAll()});
        })
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
            scheduleVisible: false,
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
            scheduleVisible: false,
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
                scheduleVisible: false,
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
            scheduleVisible: false,
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
            scheduleVisible: false,
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

    render() {
        return (
            <div>
                <HeaderComponent onClickHomeHeader={this.onClickHomeHeader.bind(this)}/>
                <AppComponent>
                    { this.state.panel.isHomeVisible || this.state.panel.shiftPlacePanelVisible ?
                        <PanelComponent cardTitle='Plantão'
                                        type="PLANTAO"
                                        managerName={this.state.panel.managerName}
                                        onClickEditShiftPlace={this.onClickEditShiftPlace.bind(this)}/> : null}
                    { this.state.panel.isHomeVisible || this.state.panel.brokerPanelVisible ?
                        <PanelComponent
                        onClickEditShiftPlace={this.onClickEditBroker.bind(this)}
                        cardTitle='Corretor'
                        managerName={this.state.panel.managerName}
                        type="CORRETOR"
                    /> : null }
                    { this.state.panel.isHomeVisible || this.state.panel.schedulePanelVisible ?
                        <PanelComponent type='ESCALA'
                                        managerName={this.state.panel.managerName}
                                        cardTitle='Escala'/> : null}
                    { this.state.panel.isShiftPlaceFormVisible ?
                        <ShiftPlaceFormComponent shiftPlaceData={this.state.panel.shiftPlaceData} edit={this.state.panel.edit}
                                                 managersName={this.state.panel.managerName}/> : null}
                    { this.state.panel.isBrokerFormVisible ?
                        <BrokerFormComponent brokerData={this.state.panel.brokerData} edit={this.state.panel.edit}
                                             managersName={this.state.panel.managerName}/> : null}
                    { this.state.panel.isListComponentVisible ? <ListComponent
                        listOptions={this.state.panel.listOptions}
                        listData={this.state.panel.listData}
                        onClickPanelLine={this.onClickPanelLine.bind(this)}
                    /> : null}
                    {this.state.panel.scheduleVisible ? <ScheduleComponent brokers={this.state.panel.brokers}
                                                                     scheduleWrapper={this.state.panel.scheduleData}/> : null}
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
