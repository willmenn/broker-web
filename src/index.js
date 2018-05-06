import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './template/header'
import FooterComponent from './template/Footer'
import LoginHeaderComponent from './template/loginHeader'

import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import ListComponent from './components/ListComponent';
import ListAllComponent from './components/ListAllComponent';
import StatisticsComponent from './components/StatisticsComponent'
import ShiftPlaceFormComponent from './components/ShiftPlaceFormComponent';
import BrokerFormComponent from './components/BrokerFormComponent';
import ScheduleComponent from './components/schedule/ScheduleComponent';
import LoginComponent from './components/LoginFormComponent';
import './index.css';

import PanelStore from './store/PanelStore'
import ListStore from './store/ListStore'
import LoginStore from './store/LoginStore'
import HeaderStore  from './store/HeaderStore'
import ListSchedule from "./components/ListSchedule";
import ScheduleContainer from "./components/schedule/ScheduleContainer";

class App extends Component {

    constructor() {
        super();
        this.state = {panel: PanelStore.getAll()}
    }

    componentWillMount() {
        PanelStore.on('change', () => {
            console.log("Index: Panel change")
            this.setState({panel: PanelStore.getAll()});
        })
        ListStore.on('change', () => {
            console.log("Index: List change")
            this.setState({panel: ListStore.getAll()});
        })
        LoginStore.on('change', () => {
            console.log("Index: Login change")
            this.setState({panel: LoginStore.getAll()});
        })
        HeaderStore.on('change', () => {
            console.log("Index:  Header change")
            this.setState({panel: HeaderStore.getAll()});
        })
    }

    render() {
        return (
            <div>
                {this.state.panel.managerName !== "" ? <HeaderComponent managerName={this.state.panel.managerName}/> :
                    <LoginHeaderComponent/>}
                {this.state.panel.managerName === "" ? <AppComponent><LoginComponent/></AppComponent> :
                    <AppComponent>
                        { this.state.panel.isHomeVisible || this.state.panel.shiftPlacePanelVisible ?
                            <PanelComponent cardTitle='Plantão'
                                            type="PLANTAO"
                                            managerName={this.state.panel.managerName}/> : null}
                        { this.state.panel.isHomeVisible || this.state.panel.brokerPanelVisible ?
                            <PanelComponent
                                cardTitle='Corretor'
                                managerName={this.state.panel.managerName}
                                type="CORRETOR"
                            /> : null }
                        { this.state.panel.isHomeVisible || this.state.panel.schedulePanelVisible ?
                            <PanelComponent type='ESCALA'
                                            managerName={this.state.panel.managerName}
                                            cardTitle='Escala'/> : null}
                        { this.state.panel.isShiftPlaceFormVisible ?
                            <ShiftPlaceFormComponent shiftPlaceData={this.state.panel.shiftPlaceData}
                                                     edit={this.state.panel.edit}
                                                     managersName={this.state.panel.managerName}/> : null}
                        { this.state.panel.isBrokerFormVisible ?
                            <BrokerFormComponent brokerData={this.state.panel.brokerData} edit={this.state.panel.edit}
                                                 managersName={this.state.panel.managerName}
                                                 shiftPlaceList={this.state.panel.shiftPlaceList}/> : null}
                        { this.state.panel.isListComponentVisible ? <ListComponent
                            listOptions={this.state.panel.listOptions}
                            listData={this.state.panel.listData}
                        /> : null}
                        {this.state.panel.scheduleVisible ? <ScheduleContainer brokers={this.state.panel.brokers}
                                                                               scheduleWrapper={this.state.panel.scheduleData}
                                                                               managersName={this.state.panel.managerName}/> : null}
                        {this.state.panel.listAllComponentVisible ? <ListAllComponent/> : null}
                        {this.state.panel.listAllComponentVisible ? <StatisticsComponent
                            manager={this.state.panel.managerName}/> : null}
                        {this.state.panel.listScheduleVisible ? <ListSchedule/>
                            : null}
                    </AppComponent>

                }
                {this.state.panel.managerName !== "" ? <FooterComponent/> : null}
            </div>
        )
    }
}

const refreshReact = () => {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}

refreshReact();
