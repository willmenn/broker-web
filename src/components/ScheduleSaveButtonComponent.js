import React, {Component} from 'react';
import * as SchedulesaveButtonAction from '../action/ScheduleSaveButtonAction';
import ScheduleSaveButtonStore from '../store/ScheduleSaveButtonStore'
const displayNone = {
    display: 'none'
}

const displayBlock = {
    display: 'block',
    fontSize: '12px'
}

class ScheduleSaveButtonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: ScheduleSaveButtonStore.getDefaultState()
        }
    }

    componentWillMount() {
        ScheduleSaveButtonStore.on('change', () => {
            console.log("change")
            this.setState({schedule: ScheduleSaveButtonStore.getAll()});
        })
    }

    onSubmit(evt) {

        SchedulesaveButtonAction.saveSchedule({
            manager: this.props.manager,
            scheduleId: this.state.schedule.scheduleId
        });
        evt.preventDefault();
        return false;
    }

    handleNotificationExitButton() {
        this.setState({
            schedule: ScheduleSaveButtonStore.getDefaultState()
        })
    }

    render() {
        return (
            <div>
                <form classID="brokerForm" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field is-grouped">
                        <p className="control">
                            <button className="button is-primary tooltip is-tooltip-right is-tooltip-dark"
                                    data-tooltip="Ao clicar no botão irá salvar uma nova escala."
                                    type="submit">
                                Salvar Escala
                            </button>
                        </p>
                    </div>
                    <div className="notification is-success"
                         style={this.state.schedule.isSuccess ? displayBlock : displayNone}>
                        <button type='reset' className="delete"
                                onClick={this.handleNotificationExitButton.bind(this)}></button>
                        Salvado com sucesso!
                    </div>
                </form>
            </div >
        )
    }
}

export default ScheduleSaveButtonComponent;

