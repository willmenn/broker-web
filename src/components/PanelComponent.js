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
         let now = new Date().toISOString().split('T');
        if(scheduleId){
           return  <div>
                <p>Você tem uma escala gerada, para visualizar clique <a onClick={() => this.visualizeSchedule()}>aqui</a>.
                    <br/>
                    <small>{now[0] + ' ' + now[1].split('.')[0]}</small>
                </p>
            </div>

        }else{
            return <div>
                <p className="subtitle is-6">Clique no botão <a onClick={() =>
                    this.cadastroButton({type: this.props.type, manager: this.props.managerName})}>Gerar Escala</a>,
                    <br/>
                     para criar uma escala para a sua equipe.
                </p>
            </div>
        }

}

    visualizeSchedule(){
         PanelAction.createPanelAction({type: 'ESCALA_VISUALIZATION',manager: this.props.managerName, scheduleId: this.state.panel.scheduleId})
    }

    render() {
        return (
            <div id={this.props.cardTitle + 'Id'} className="column is-one-third transition5">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {this.props.cardTitle}
                        </p>
                    </header>
                    <div className="card-content" style={this.props.type === 'ESCALA' &&
                    !this.state.panel.scheduleId ?{padding: 30 + 'px'}: null }>
                        <div className="content" >
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