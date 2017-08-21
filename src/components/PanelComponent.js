import React, {Component} from 'react';
import * as PanelAction from '../action/PanelAction';

class PanelComponent extends Component {

    cadastroButton(event) {
        PanelAction.createPanelAction({type: event.type, manager: event.manager});
    }

    deleteButton(event) {
        PanelAction.deletePanelAction({type: event.type, manager: event.manager});
    }

    render() {
        return (
            <div id={this.props.cardTitle + 'Id'} className="column is-one-third transition5">
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
                        <a className="card-footer-item" onClick={() => {
                            this.cadastroButton({type: this.props.type, manager: this.props.managerName})

                        }}>Cadastrar</a>
                        <a className="card-footer-item" onClick={() => {
                            document.getElementById(this.props.cardTitle + 'Id').className += " " + ""
                            this.props.onClickEditShiftPlace(this.props.cardTitle)
                        }}>Editar</a>
                        <a className="card-footer-item" onClick={() => {
                            this.deleteButton({type: this.props.type, manager: this.props.managerName})
                        }}>Deletar</a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default PanelComponent;