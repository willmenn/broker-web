import React, {Component} from 'react';
import * as HeaderAction from '../action/HeaderAction'

class HeaderComponent extends Component {

    home() {
        HeaderAction.homeAction();
    }

    render() {
        return (
            <section className="hero is-primary">
                <div className="hero-head">
                    <header className="nav">
                        <div className="container">
                            <div className="nav-left">
                                <a className="nav-item">
                                    <p className="subtitle is-3 is-bold">Broker Scheduler</p>
                                </a>
                            </div>
                            <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
                            <div className="nav-right nav-menu">
                                <a className="nav-item" onClick={() => this.home()}>
                                    Home
                                </a>
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
            </section>
        )
    }
}

export default HeaderComponent;