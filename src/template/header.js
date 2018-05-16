import React, {Component} from 'react';
import * as HeaderAction from '../action/HeaderAction'

class HeaderComponent extends Component {

    home() {
        HeaderAction.homeAction();
    }

    showAllBrokers() {
        HeaderAction.showAllBrokersAction({manager: this.props.managerName});
    }

    showAllShiftPlaces() {
        HeaderAction.showAllShiftPlacesAction({manager: this.props.managerName});
    }

    showScheduleList() {
        HeaderAction.showScheduleListAction({manager: this.props.managerName});
    }

    showActiveSchedule() {
        HeaderAction.showActiveScheduleAction({manager: this.props.managerName});
    }

    render() {
        return (
            this.props.isBroker ? this.brokerHeader() : this.managerHeader()
        )
    }

    brokerHeader() {
        return <section className="hero is-primary">
            <div className="hero-head">
                <header className="nav">
                    <div className="container">
                        <div className="nav-left">
                            <a className="nav-item" style={{paddingLeft: 0}}>
                                <p className="subtitle is-3 is-bold">Broker Scheduler</p>
                            </a>
                        </div>
                        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
                        <div className="nav-right nav-menu">
                            <a className="nav-item">
                                Sobre
                            </a>
                        </div>
                    </div>
                </header>
            </div>
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Olá, {this.props.brokerName}
                    </h1>
                    <h2 className="subtitle">
                        use o sistema para visualizar a escala da semana do seu time.
                    </h2>
                </div>
            </div>
            <div className="hero-foot">
                <nav className="tabs">
                    <div className="container">
                        <ul>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.home()}>
                                Home
                            </a></li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.home()}>
                                Recados
                            </a>
                            </li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.showAllShiftPlaces()}>
                                Plantões
                            </a>
                            </li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.showActiveSchedule()}>
                                Ver Escala
                            </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </section>;
    }

    managerHeader() {
        return <section className="hero is-primary">
            <div className="hero-head">
                <header className="nav">
                    <div className="container">
                        <div className="nav-left">
                            <a className="nav-item" style={{paddingLeft: 0}}>
                                <p className="subtitle is-3 is-bold">Broker Scheduler</p>
                            </a>
                        </div>
                        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
                        <div className="nav-right nav-menu">
                            <a className="nav-item">
                                Sobre
                            </a>
                        </div>
                    </div>
                </header>
            </div>
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Olá, {this.props.managerName}
                    </h1>
                    <h2 className="subtitle">
                        use o sistema para gerar a escala da semana do seu time.
                    </h2>
                </div>
            </div>
            <div className="hero-foot">
                <nav className="tabs">
                    <div className="container">
                        <ul>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.home()}>
                                Home
                            </a></li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.showScheduleList()}>
                                Últimas Escalas
                            </a></li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.home()}>
                                Recados
                            </a>
                            </li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.showAllBrokers()}>
                                Corretores
                            </a>
                            </li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.showAllShiftPlaces()}>
                                Plantões
                            </a>
                            </li>
                            <li><a style={{paddingLeft: 0}} onClick={() => this.home()}>
                                Dashboard
                            </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>;
    }
}

export default HeaderComponent;