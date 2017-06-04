import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './template/header'

import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import ListComponent from './components/ListComponent';
import ShiftPlaceFormComponent from './components/ShiftPlaceFormComponent'
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
            managerName: 'MTest'
        };
    }


    onClickRegisterShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: true,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            }
        });
        refreshReact();
    }

    onClickHomeHeader() {
        this.setState({
            isHomeVisible: true,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false
        });
        refreshReact();
    }

    onClickEditShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: false,
            isListComponentVisible: true,
            shiftPlacePanelVisible: true,
            listOptions: {title: 'Plantão', action: 'Edit'},
            listData: []
        });

        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/manager/" + this.state.managerName;
        axiosConfig().get(url).then(res => {
            this.setState({listData: res.data});
            refreshReact();
        });
    }

    onClickPanelLine(id) {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: true,
            isListComponentVisible: false,
            shiftPlacePanelVisible: false,
            shiftPlaceData: {
                name: "Plantão",
                address: "Endereço",
                places: "Lugares"
            }
        });

        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + id;
        axiosConfig().get(url).then(res => {
            this.setState({shiftPlaceData: res.data});
            refreshReact();
        });
    }


    render() {
        return (
            <div>
                <HeaderComponent onClickHomeHeader={this.onClickHomeHeader.bind(this)}/>
                <AppComponent>
                    { this.state.isHomeVisible || this.state.shiftPlacePanelVisible ?
                        <PanelComponent cardTitle='Plantão'
                                        onClickRegisterShiftPlace={this.onClickRegisterShiftPlace.bind(this)}
                                        onClickEditShiftPlace={this.onClickEditShiftPlace.bind(this)}/> : null}
                    { this.state.isHomeVisible ? <PanelComponent cardTitle='Corretor'/> : null }
                    { this.state.isHomeVisible ? <PanelComponent cardTitle='Escala'/> : null}
                    { this.state.isShiftPlaceFormVisible ?
                        <ShiftPlaceFormComponent shiftPlaceData={this.state.shiftPlaceData}/> : null}
                    { this.state.isListComponentVisible ? <ListComponent
                        listOptions={this.state.listOptions}
                        listData={this.state.listData}
                        onClickPanelLine={this.onClickPanelLine.bind(this)}
                    /> : null}
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
