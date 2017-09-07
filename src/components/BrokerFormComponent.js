import React, {Component} from 'react';
import axios from 'axios';

const displayNone = {
    display: 'none'
}

const displayBlock = {
    display: 'block',
    fontSize: '12px'
}

const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

class BrokerFormComponent extends Component {


    constructor() {
        super();
        this.state = {
            isSuccess: false,
            isEdited: false
        }
    }

    onSubmit(evt) {

        let data = this.createFormData(evt);
        data.manager = this.props.managersName;
        if (this.props.edit) {
            this.updateData(data);
            let body = JSON.stringify(data);
            this.executePut(body, this.props.brokerData.brokerId);
        } else {
            let body = JSON.stringify(data);
            this.executePost(body);
        }
        evt.preventDefault();
        return false;
    }

    updateData(data) {
        data.name = data.name !== '' ? data.name : this.props.brokerData.name;
        data.preference = data.preference.weekDay !== this.props.brokerData.preference.weekday ? data.preference : this.props.brokerData.preference;
    }

    executePut(data, id) {
        var url = "https://brokermanagement-dev.herokuapp.com/broker/" + id;

        axiosConfig().put(url, data);
        this.setState({isEdited: true})
    }


    executePost(data) {
        var url = "https://brokermanagement-dev.herokuapp.com/broker";

        axiosConfig().post(url, data);
        this.setState({isSuccess: true})
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

    handleNotificationExitButton() {
        this.setState({
            isSuccess: false,
            isEdited: false
        })
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

                    <div className="field is-grouped">
                        <p className="control">
                            <button className="button is-primary"  type="submit">Salvar</button>
                        </p>
                        <p className="control">
                            <button className="button is-link" type="reset">Resetar</button>
                        </p>
                    </div>
                    <div className="notification is-success" style={this.state.isSuccess ? displayBlock : displayNone}>
                        <button type='reset' className="delete" onClick={this.handleNotificationExitButton.bind(this)}></button>
                        Criado com sucesso!
                    </div>
                    <div className="notification is-info" style={this.state.isEdited ? displayBlock : displayNone}>
                        <button type='reset' className="delete" onClick={this.handleNotificationExitButton.bind(this)}></button>
                        Editado com sucesso!
                    </div>
                </form>
            </div >
        )
    }


}

export default BrokerFormComponent;

