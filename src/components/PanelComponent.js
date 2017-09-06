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
        this.state = {panel: PanelStore.getPanelData()};
    }

    componentDidMount() {
        PanelAction.createPanelCountAction({type: this.props.type, manager: this.props.managerName});
    }

    componentWillMount() {
        PanelStore.on('componentChange', () => {
            console.log("componentChange")
            this.setState({panel: PanelStore.getPanelData()});
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

     escalaPanelText(scheduleId){
        if(scheduleId){
           return  <div>
                <p>Você tem uma escala gerada, para visualizar clique <a>aqui</a>.
                    <br/>
                    <small>{new Date().toString('dddd','MMMM','yyyy')}</small>
                </p>
            </div>

        }else{
            return <div>
                <p> Clique no botão <a>Gerar Escala</a>,
                    <br/>
                    <small> para criar uma escala para
                        a sua equipe.</small>
                </p>
            </div>
        }

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
                                                        this.escalaPanelText(this.state.panel.scheduleId)        }
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={() => {
                            this.cadastroButton({type: this.props.type, manager: this.props.managerName})

                        }}>{this.props.type === 'ESCALA'? 'Gerar Escala' : 'Cadastrar'}</a>
                        {this.props.type !== 'ESCALA'? <a className="card-footer-item" onClick={() => {
                            this.editButton({type: this.props.type, manager: this.props.managerName})

                        }}>Editar</a> : null}
                        {this.props.type !== 'ESCALA'?<a className="card-footer-item" onClick={() => {
                            this.deleteButton({type: this.props.type, manager: this.props.managerName})
                        }}>Deletar</a>:  null}
                    </footer>
                </div>
            </div>
        )
    }
}

export default PanelComponent;