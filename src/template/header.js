import React, {Component} from 'react';

class HeaderComponent extends Component {

    render() {
        return (<div>
                <nav className="nav">
                    <span className="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
              </span>
                    <div className="nav-right nav-menu">
                        <a className="nav-item" onClick={this.props.onClickHomeHeader}>
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