import React, {Component} from 'react';


class PanelComponent extends Component {

    render() {
        return (
            <div className="column is-one-third">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {this.props.cardTitle}
                        </p>
                        <a className="card-header-icon">
                      <span className="icon">
                        <i className="fa fa-angle-down"></i>
                      </span>
                        </a>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis
                            mauris.
                            <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
                            <br/>
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={this.props.onClickRegisterShiftPlace}>Cadastrar</a>
                        <a className="card-footer-item" onClick={() => this.props.onClickEditShiftPlace(this.props.cardTitle)}>Editar</a>
                        <a className="card-footer-item">Deletar</a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default PanelComponent;