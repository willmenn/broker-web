import React, {Component} from 'react';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

class BrokerFormComponent extends Component {

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
    }


    executePost(data) {
        var url = "https://brokermanagement-dev.herokuapp.com/broker";

        axiosConfig().post(url, data);
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
            <div>
                <form classID="brokerForm" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Nome do corretor</label>
                        <p className="control">
                            <input className="input" type="text"
                                   placeholder={ this.props.brokerData.name } name="name"/>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Subject</label>
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
                            <button className="button is-primary">Submit</button>
                        </p>
                        <p className="control">
                            <button className="button is-link">Cancel</button>
                        </p>
                    </div>
                </form>
            </
                div >
        )
    }


}

export default BrokerFormComponent;

