import React, {Component} from 'react';
import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

class ShiftPlaceFormComponent extends Component {

    onSubmit(evt) {
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace";

        let data = this.createFormData(evt);

        //TODO missing managersName.
        axiosConfig().post(url, data);

        evt.preventDefault();
        return false;
    }

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        return JSON.stringify(body);
    }

    render() {
        return (
            <div>
                <form classID="shiftPlaceForm" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Nome do plantão</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Plantão" name="name"/>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Endereço do plantão</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Endereço" name="address"/>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Número de lugares no plantão</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="Lugares" name="places"/>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Subject</label>
                        <p className="control">
                        <span className="select">
                          <select>
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
            </div>
        )
    }
}

export  default ShiftPlaceFormComponent;