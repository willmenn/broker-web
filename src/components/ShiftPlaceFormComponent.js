import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveButtonComponent from "./SaveFormButtonComponent";
import InputBulmaComponent from './InputBulmaComponent'

class ShiftPlaceFormComponent extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            inputPlantao: false,
            inputEndereco: false,
            inputNLugares: false
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

    handlePlantaoInputValidation(isValid) {
        this.setState({inputPlantao: isValid});
    }

    handleEnderecoInputValidation(isValid) {
        this.setState({inputEndereco: isValid});
    }

    handleNLugaresInputValidation(isValid) {
        this.setState({inputNLugares: isValid});
    }

    disableSubmitButton() {
        if (this.state.inputEndereco
            && this.state.inputNLugares
            && this.state.inputPlantao) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="column is-narrow-desktop is-offset-one-quarter">
                <form classID="shiftPlaceForm" className="box" style={{backgroundColor: 'whitesmoke'}}
                      onSubmit={this.onSubmit.bind(this)}>
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder={ this.props.shiftPlaceData.name }
                        name="name"
                        labelName="Nome do Plantão:"
                        inputType="text"
                        inputMaxLength="20"
                        errorMessage="Plantão inválido."
                        warningMessage="O campo plantão não pode ser vazio."
                        inputIsValid={this.handlePlantaoInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[a-zA-Z]{2,}[0-9]{0,}/}
                    />
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder={this.props.shiftPlaceData.address}
                        name="address"
                        labelName="Endereço:"
                        inputType="text"
                        inputMaxLength="20"
                        errorMessage="Endereço inválido."
                        warningMessage="O campo endereço não pode ser vazio."
                        inputIsValid={this.handleEnderecoInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[a-zA-Z]{2,}[0-9]{0,}/}
                    />
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder={this.props.shiftPlaceData.places }
                        name="places"
                        labelName="Número de lugares:"
                        inputType="text"
                        inputMaxLength="20"
                        errorMessage="Número de lugares inválido."
                        warningMessage="O campo n de lugares não pode ser vazio."
                        inputIsValid={this.handleNLugaresInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[0-9]{1,}/}
                    />
                    <div className="field">
                        <label className="label">Dia de trabalho:</label>
                        <p className="control">
                        <span className="select">
                          <select name="days" style={{width: 209 + 'px'}}>
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
                    <SaveButtonComponent  handleDisable={this.disableSubmitButton()}/>
                </form>
            </div >
        )
    }
}

export  default ShiftPlaceFormComponent;