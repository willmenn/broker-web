import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveFormButtonComponent from './SaveFormButtonComponent'
import InputBulmaComponent from './InputBulmaComponent'

class BrokerFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputCorretor: false
        }
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
            SaveFormButtonAction.saveFormButtonAction({type: 'CORRETOR', data: body, manager: this.props.managersName})
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

    handleCorretorInputValidation(isValid) {
        this.setState({inputCorretor: isValid});
    }

    disableSubmitButton() {
        if (this.state.inputCorretor) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="column is-narrow-desktop is-offset-one-quarter">
                <form classID="brokerForm" className="box" style={{backgroundColor: 'whitesmoke'}}
                      onSubmit={this.onSubmit.bind(this)}>
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder={ this.props.brokerData.name }
                        name="name"
                        labelName="Nome do Corretor:"
                        inputType="text"
                        inputMaxLength="20"
                        errorMessage="Nome inválido."
                        warningMessage="O campo nome não pode ser vazio."
                        inputIsValid={this.handleCorretorInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[a-zA-Z]{2,}[0-9]{0,}/}
                    />
                    <div className="field">
                        <label className="label">Preferência de dia:</label>
                        <p className="control">
                        <span className="select" style={{width: 209 + 'px'}}>
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
                    <SaveFormButtonComponent handleDisable={this.disableSubmitButton()}/>
                </form>
            </div >
        )
    }


}

export default BrokerFormComponent;

