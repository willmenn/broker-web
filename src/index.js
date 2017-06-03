import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './App';
import PanelComponent from './components/PanelComponent';
import HeaderComponent from './template/header'
import registerServiceWorker from './registerServiceWorker';
import './index.css';


class App extends Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <AppComponent>
                    <PanelComponent cardTitle="Plantão"/>
                    <PanelComponent cardTitle="Corretor"/>
                    <PanelComponent cardTitle="Escala"/>
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
