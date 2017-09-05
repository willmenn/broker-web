import React, {Component} from 'react';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

class ShiftPlaceFormComponent extends Component {


    constructor() {
        super();
        this.state = {
            name: ''
        }
    }

    onSubmit(evt) {

        let data = this.createFormData(evt);
        data.managersName = this.props.managersName;
        if (this.props.edit) {
            this.updateData(data);
            let body = JSON.stringify(data);
            this.executePut(body, this.props.shiftPlaceData.shiftPlaceId);
        } else {
            let body = JSON.stringify(data);
            this.executePost(body);
        }
        evt.preventDefault();
        return false;
    }

    updateData(data) {
        data.name = data.name !== '' ? data.name : this.props.shiftPlaceData.name;
        data.address = data.address !== '' ? data.address : this.props.shiftPlaceData.address;
        data.places = data.places !== '' ? data.places : this.props.shiftPlaceData.places;
        data.days = data.days[0] !== this.props.shiftPlaceData.days[0] ? data.days : this.props.shiftPlaceData.days;

    }

    executePut(data, id) {
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + id;

        axiosConfig().put(url, data);
    }


    executePost(data) {
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace";

        //TODO missing managersName.
        axiosConfig().post(url, data);
    }

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        body.days=[evt.target.elements.days.value];
        return body;
    }


    render() {
        return (
            <div className="column is-narrow-desktop is-offset-one-quarter">
                <form classID="shiftPlaceForm" className="box" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Nome do plantão</label>
                        <p className="control">
                            <input className="input" type="text"
                                   placeholder={ this.props.shiftPlaceData.name } name="name"/>

                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Endereço do plantão</label>
                        <p className="control">
                            <input className="input" type="text" name="address"
                                   placeholder={this.props.shiftPlaceData.address}/>

                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Número de lugares no plantão</label>
                        <p className="control">
                            <input className="input" type="text" name="places"
                                   placeholder={this.props.shiftPlaceData.places }/>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Subject</label>
                        <p className="control">
                        <span className="select" >
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

export  default ShiftPlaceFormComponent;