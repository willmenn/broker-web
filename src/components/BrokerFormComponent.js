import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveFormButtonComponent from './SaveFormButtonComponent'

class BrokerFormComponent extends Component {

    constructor(props){
        super(props);
    }

    onSubmit(evt) {
        let data = this.createFormData(evt);
        data.manager = this.props.managersName;
        if (this.props.edit) {
            this.updateData(data);
            let body = JSON.stringify(data);
            SaveFormButtonAction.editFormButtonAction({
                type: 'CORRETOR',
                data: body,
                id: this.props.brokerData.brokerId
            });
        } else {
            let body = JSON.stringify(data);
            SaveFormButtonAction.saveFormButtonAction({type: 'CORRETOR', data: body})
        }
        evt.preventDefault();
        return false;
    }

    updateData(data) {
        data.name = data.name !== '' ? data.name : this.props.brokerData.name;
        data.preference = data.preference.weekDay !== this.props.brokerData.preference.weekday ? data.preference : this.props.brokerData.preference;
    }

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        body.preference =
            {
                weekDay: evt.target.elements.days.value
            }
        ;
        console.log(body);
        return body;
    }

    render() {
        return (
            <div className="column is-narrow-desktop is-offset-one-quarter">
                <form classID="brokerForm" className="box" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Nome do corretor</label>
                        <p className="control">
                            <input className="input" type="text"
                                   placeholder={ this.props.brokerData.name } name="name"/>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Preferência de dia:</label>
                        <p className="control">
                        <span className="select">
                          <select name="days">
                            <option value="SUN">Domingo</option>
                            <option value="MON">Segunda-feira</option>
                            <option value="TUE">Terça-feira</option>
                              <option value="WED">Quarta-feira</option>
                              <option value="THU">Quinta-feira</option>
                              <option value="FRI">Sexta-feira</option>
                              <option value="SAT">Sábado</option>
                          </select>
                        </span>
                        </p>
                    </div>
                    <SaveFormButtonComponent/>
                </form>
            </div >
        )
    }


}

export default BrokerFormComponent;

