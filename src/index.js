import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './template/header'
import FooterComponent from './template/Footer'
import LoginHeaderComponent from './template/loginHeader'

import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import ListComponent from './components/ListComponent';
import ShiftPlaceFormComponent from './components/ShiftPlaceFormComponent';
import BrokerFormComponent from './components/BrokerFormComponent';
import ScheduleComponent from './components/ScheduleComponent';
import LoginComponent from './components/LoginFormComponent';
import './index.css';

import PanelStore from './store/PanelStore'
import ListStore from './store/ListStore'
import LoginStore from './store/LoginStore'
import HeaderStore  from './store/HeaderStore'

class App extends Component {

    constructor() {
        super();
        this.state = {panel: PanelStore.getAll()}
    }

    componentWillMount() {
        PanelStore.on('change', () => {
            console.log("change")
            this.setState({panel: PanelStore.getAll()});
        })
        ListStore.on('change', () => {
            console.log("List change")
            this.setState({panel: ListStore.getAll()});
        })
        LoginStore.on('change', () => {
            console.log("Login change")
            this.setState({panel: LoginStore.getAll()});
        })
        HeaderStore.on('change', () => {
            console.log("Login change")
            this.setState({panel: HeaderStore.getAll()});
        })
    }

    render() {
        return (
            <div>
                {this.state.panel.managerName !== "" ?<HeaderComponent managerName={this.state.panel.managerName}/>:
                    <LoginHeaderComponent/>}
                {this.state.panel.managerName === "" ? <AppComponent><LoginComponent/></AppComponent>:
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
                                                     managersName={this.state.panel.managerName}/> : null}
                            { this.state.panel.isListComponentVisible ? <ListComponent
                                listOptions={this.state.panel.listOptions}
                                listData={this.state.panel.listData}
                            /> : null}
                            {this.state.panel.scheduleVisible ? <ScheduleComponent brokers={this.state.panel.brokers}
                                                                                   scheduleWrapper={this.state.panel.scheduleData}
                                                                                   managersName={this.state.panel.managerName}/> : null}

                </AppComponent>

                }
                {this.state.panel.managerName !== "" ?<FooterComponent/> : null}
            </div>
        )
    }
}

const refreshReact = () => {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}

refreshReact();
