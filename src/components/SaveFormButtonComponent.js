import React, {Component} from 'react';
import SaveFormButtonStore from '../store/SaveFormButtonStore'

const displayNone = {
    display: 'none'
}

const displayBlock = {
    display: 'block',
    fontSize: '12px',
    marginBottom: 0
}


class SaveButtonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            broker: SaveFormButtonStore.setDefaultState()
        }
    }

    componentWillMount() {
        SaveFormButtonStore.on('change', () => {
            console.log("change")
            this.setState({broker: SaveFormButtonStore.getBrokerAll()});
        })
    }

    handleNotificationExitButton() {
        this.setState({broker: SaveFormButtonStore.setDefaultState()});
    }

    render() {
        return (
            <div>
                <div className="field is-grouped">
                    <p className="control">
                        <button className="button is-primary"  type="submit">Salvar</button>
                    </p>
                    <p className="control">
                        <button className="button is-link" type="reset">Resetar</button>
                    </p>
                </div>
                <div className="notification is-success" style={this.state.broker.isSuccess ? displayBlock : displayNone}>
                    <button type='reset' className="delete" onClick={this.handleNotificationExitButton.bind(this)}></button>
                    Criado com sucesso!
                </div>
                <div className="notification is-info" style={this.state.broker.isEdited ? displayBlock : displayNone}>
                    <button type='reset' className="delete" onClick={this.handleNotificationExitButton.bind(this)}></button>
                    Editado com sucesso!
                </div>
            </div >
        )
    }
}

export default SaveButtonComponent;

