import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveFormButtonComponent from '../components/SaveFormButtonComponent'
import SaveButtonComponent from "./SaveFormButtonComponent";

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
            SaveFormButtonAction.editFormButtonAction({
                type: 'PLANTAO',
                data: body,
                id: this.props.shiftPlaceData.shiftPlaceId
            });
        } else {
            let body = JSON.stringify(data);
            SaveFormButtonAction.saveFormButtonAction({
                type: 'PLANTAO',
                data: body
            });
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

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        body.days = [evt.target.elements.days.value];
        return body;
    }


    render() {
        return (
            <div className="column is-narrow-desktop is-offset-one-quarter">
                <form classID="shiftPlaceForm" className="box" style={{backgroundColor: 'whitesmoke'}} onSubmit={this.onSubmit.bind(this)}>
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
                        <label className="label">Dia para trabalhar no plantão:</label>
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
                    <SaveButtonComponent/>
                </form>
            </div >
        )
    }
}

export  default ShiftPlaceFormComponent;