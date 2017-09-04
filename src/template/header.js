import React, {Component} from 'react';
import * as HeaderAction from '../action/HeaderAction'

class HeaderComponent extends Component {

    home() {
        HeaderAction.homeAction();
    }

    render() {
        return (<div>
                <nav className="nav">
                    <span className="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
              </span>
                    <div className="nav-right nav-menu">
                        <a className="nav-item" onClick={this.home.bind(this)}>
                            Home
                        </a>
                        <a className="nav-item">
                            Sobre
                        </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default HeaderComponent;