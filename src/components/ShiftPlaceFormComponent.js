import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveButtonComponent from "./SaveFormButtonComponent";
import InputBulmaComponent from './bulma/InputBulmaComponent'
import DayInputComponent from './DayInputComponent'

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
                data: body,
                manager: this.props.managersName
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
        body.SUN = this.state.SUN;
        body.MON = this.state.MON;
        body.TUE = this.state.TUE;
        body.WED = this.state.WED;
        body.THU = this.state.THU;
        body.FRI = this.state.FRI;
        body.SAT = this.state.SAT;
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
            && this.state.inputPlantao) {
            return false;
        } else {
            return true;
        }
    }

    handleSUNChange(value) {
        console.log(value)
        this.setState({SUN: value});
    }

    handleMONChange(value) {
        this.setState({MON: value});
    }

    handleTUEChange(value) {
        this.setState({TUE: value});
    }

    handleWEDChange(value) {
        this.setState({WED: value});
    }

    handleTHUChange(value) {
        this.setState({THU: value});
    }

    handleFRIChange(value) {
        this.setState({FRI: value});
    }

    handleSATChange(value) {
        this.setState({SAT: value});
    }

    render() {
        return (
            <div className="column is-half">
                <form id="shiftPlaceForm" className="box" style={{backgroundColor: 'whitesmoke'}}
                      onSubmit={this.onSubmit.bind(this)}>
                    <InputBulmaComponent
                        placeHolder={this.props.shiftPlaceData.name}
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
                    <DayInputComponent dayName="Domingo" name="SUN" value={this.props.shiftPlaceData.SUN}
                                       dayChange={this.handleSUNChange.bind(this)}/>
                    <DayInputComponent dayName="Segunda" name="MON" value={this.props.shiftPlaceData.MON}
                                       dayChange={this.handleMONChange.bind(this)}/>
                    <DayInputComponent dayName="Terça" name="TUE" value={this.props.shiftPlaceData.TUE}
                                       dayChange={this.handleTUEChange.bind(this)}/>
                    <DayInputComponent dayName="Quarta" name="WED" value={this.props.shiftPlaceData.WED}
                                       dayChange={this.handleWEDChange.bind(this)}/>
                    <DayInputComponent dayName="Quinta" name="THU" value={this.props.shiftPlaceData.THU}
                                       dayChange={this.handleTHUChange.bind(this)}/>
                    <DayInputComponent dayName="Sexta" name="FRI" value={this.props.shiftPlaceData.FRI}
                                       dayChange={this.handleFRIChange.bind(this)}/>
                    <DayInputComponent dayName="Sábado" name="SAT" value={this.props.shiftPlaceData.SAT}
                                       dayChange={this.handleSATChange.bind(this)}/>
                    <SaveButtonComponent handleDisable={this.disableSubmitButton()}/>
                </form>
            </div>
        )
    }
}

export default ShiftPlaceFormComponent;