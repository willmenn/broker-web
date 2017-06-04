import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import HeaderComponent from './template/header'

import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import ShiftPlaceFormComponent from './components/ShiftPlaceFormComponent'
import './index.css';



class App extends Component {

    constructor() {
        super();
        this.state = {
            isHomeVisible: true,
            isShiftPlaceFormVisible: false
        };
    }


    onClickRegisterShiftPlace() {
        this.setState({
            isHomeVisible: false,
            isShiftPlaceFormVisible: true
        });
        refreshReact();
    }

    onClickHomeHeader() {
        this.setState({
            isHomeVisible: true,
            isShiftPlaceFormVisible: false
        });
        refreshReact();
    }

    render() {
        return (
            <div>
                <HeaderComponent onClickHomeHeader={this.onClickHomeHeader.bind(this)}/>
                <AppComponent>
                    { this.state.isHomeVisible ?
                        <PanelComponent cardTitle='Plantão'
                                        onClickRegisterShiftPlace={this.onClickRegisterShiftPlace.bind(this)}/> : null}
                    { this.state.isHomeVisible ? <PanelComponent cardTitle='Corretor'/> : null }
                    { this.state.isHomeVisible ? <PanelComponent cardTitle='Escala'/> : null}
                    { this.state.isShiftPlaceFormVisible ? <ShiftPlaceFormComponent/> : null}
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
