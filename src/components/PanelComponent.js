import React, {Component} from 'react';
import * as PanelAction from '../action/PanelAction';
import PanelStore from '../store/PanelStore'

const cardContentTitle = {
    fontSize: '4rem',
    display: 'inline'
}

const cardContentSubTitle = {
    display: 'inline',
    marginLeft: '10px'

}

class PanelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {panel: PanelStore.getCounts()};
    }

    componentDidMount() {
        PanelAction.createPanelCountAction({type: this.props.type, manager: this.props.managerName});
    }

    componentWillMount() {
        PanelStore.on('componentChange', () => {
            console.log("componentChange")
            this.setState({panel: PanelStore.getCounts()});
        })
    }

    cadastroButton(event) {
        PanelAction.createPanelAction({type: event.type, manager: event.manager});
    }

    deleteButton(event) {
        PanelAction.deletePanelAction({type: event.type, manager: event.manager});
    }

    editButton(event) {
        PanelAction.editPanelAction({type: event.type, manager: event.manager});
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
                            {this.props.type === 'PLANTAO' ?
                                <div>
                                    <p className="title"
                                       style={cardContentTitle}>{this.state.panel.shiftPlaceCount.count}</p>
                                    <p className="subtitle" style={cardContentSubTitle}>Plantões</p></div>
                                : this.props.type === 'CORRETOR' ?
                                    <div><p className="title"
                                            style={cardContentTitle}>{this.state.panel.brokerCount.count}</p>
                                        <p className="subtitle" style={cardContentSubTitle}>Corretores</p></div> :
                                    <div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                                            iaculis
                                            mauris.
                                            <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
                                            <br/>
                                            <small>11:09 PM - 1 Jan 2016</small>
                                        </p>
                                    </div>
                            }
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={() => {
                            this.cadastroButton({type: this.props.type, manager: this.props.managerName})

                        }}>Cadastrar</a>
                        <a className="card-footer-item" onClick={() => {
                            this.editButton({type: this.props.type, manager: this.props.managerName})

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