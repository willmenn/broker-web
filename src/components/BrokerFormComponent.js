import React, {Component} from 'react';
import * as SaveFormButtonAction from '../action/SaveFormButtonAction'
import SaveFormButtonComponent from './SaveFormButtonComponent'
import InputBulmaComponent from './bulma/InputBulmaComponent'
import MultipleChoiceInput from "./bulma/MultipleChoiceInput";
import {convertDayPtBrToEnglish, convertShiftPtBrToEnglish} from "../util/BrokerUtil";

class BrokerFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputCorretor: false,
            inputPassword: false,
            notWorkShift: [],
            preferNotWorkShift: [],
            notWorkDay: [],
            preferNotWorkDay: [],
            notWorkShiftPlace: [],
            preferNotWorkShiftPlace: []
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
            console.log(body);
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
            .filter(el => el.name === 'name' || el.name === 'password')
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        let constraints = {};
        constraints.DAY = this.convertDays(this.state.notWorkDay);
        constraints.PARTIAL_DAY = this.convertDays(this.state.preferNotWorkDay);
        constraints.SHIFT = this.convertShift(this.state.notWorkShift);
        constraints.PARTIAL_SHIFT = this.convertShift(this.state.preferNotWorkShift);
        constraints.SHIFT_PLACE = this.state.preferNotWorkShiftPlace;
        constraints.PARTIAL_SHIFT_PLACE = this.state.preferNotWorkShiftPlace;
        body.constraints = constraints;
        console.log(body);
        return body;
    }

    convertDays(arr){
        return arr.map(name => convertDayPtBrToEnglish(name));
    }

    convertShift(arr){
        return arr.map(name => convertShiftPtBrToEnglish(name));
    }

    handleCorretorInputValidation(isValid) {
        this.setState({inputCorretor: isValid});
    }

    handlePasswordInputValidation(isValid) {
        this.setState({inputPassword: isValid});
    }

    notWorkShift(name) {
        let arr = this.extractNewArray(this.state.notWorkShift, name);
        this.setState({notWorkShift: arr});
    }

    preferNotWorkShift(name) {
        let arr = this.extractNewArray(this.state.preferNotWorkShift, name);
        this.setState({preferNotWorkShift: arr});
    }

    notWorkDay(name) {
        let arr = this.extractNewArray(this.state.notWorkDay, name);
        this.setState({notWorkDay: arr});
    }

    preferNotWorkDay(name) {
        let arr = this.extractNewArray(this.state.preferNotWorkDay, name);
        this.setState({preferNotWorkDay: arr});
    }

    notWorkShiftPlace(name) {
        let arr = this.extractNewArray(this.state.notWorkShiftPlace, name);
        this.setState({notWorkShiftPlace: arr});
    }

    preferNotWorkShiftPlace(name) {
        let arr = this.extractNewArray(this.state.preferNotWorkShiftPlace, name);
        this.setState({preferNotWorkShiftDay: arr});
    }

    extractNewArray(old, name) {
        let arr;
        if (this.isActive(old, name)) {
            arr = old.filter(value => value !== name);
        } else {
            old.push(name);
            arr = old;
        }
        return arr;
    }

    isActive(arr, name) {
        return arr.find(value => value === name);
    }

    render() {
        return (
            <div className="column is-offset-one-quarter">
                <form id="brokerForm" className="box" style={{backgroundColor: 'whitesmoke'}}
                      onSubmit={this.onSubmit.bind(this)}>
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder={this.props.brokerData.name}
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
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder="Senha"
                        name="password"
                        labelName="Senha:"
                        inputType="password"
                        inputMaxLength="20"
                        errorMessage="A senha só pode ter números e letras."
                        warningMessage="O campo senha não pode ser vazio."
                        inputIsValid={this.handlePasswordInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[a-zA-Z]{0,}[0-9]{0,}/}
                    />
                    <MultipleChoiceInput
                        title="Não pode trabalhar nos turnos:"
                        data={["Manhã", "Tarde", "Noite"]}
                        onClick={this.notWorkShift.bind(this)}
                        actives={this.state.notWorkShift}
                    />
                    <MultipleChoiceInput
                        title="Prefere não trabalhar nos turnos:"
                        data={["Manhã", "Tarde", "Noite"]}
                        onClick={this.preferNotWorkShift.bind(this)}
                        actives={this.state.preferNotWorkShift}
                    />
                    <MultipleChoiceInput
                        title="Não pode trabalhar nos Dias:"
                        data={["Segunda", "Terça", "Quarta",
                            "Quinta", "Sexta", "Sábado", "Domingo"]}
                        onClick={this.notWorkDay.bind(this)}
                        actives={this.state.notWorkDay}
                    />
                    <MultipleChoiceInput
                        title="Prefere não trabalhar nos Dias:"
                        data={["Segunda", "Terça", "Quarta",
                            "Quinta", "Sexta", "Sábado", "Domingo"]}
                        onClick={this.preferNotWorkDay.bind(this)}
                        actives={this.state.preferNotWorkDay}
                    />
                    <MultipleChoiceInput
                        title="Não pode trabalhar nos Plantões:"
                        data={this.props.shiftPlaceList.map(sp => sp.name)}
                        onClick={this.notWorkShiftPlace.bind(this)}
                        actives={this.state.notWorkShiftPlace}
                    />
                    <MultipleChoiceInput
                        title="Prefere não trabalhar nos Plantões:"
                        data={this.props.shiftPlaceList.map(sp => sp.name)}
                        onClick={this.preferNotWorkShiftPlace.bind(this)}
                        actives={this.state.preferNotWorkShiftPlace}
                    />
                    <SaveFormButtonComponent handleDisable={!this.state.inputCorretor}/>
                </form>
            </div>
        )
    }


}

export default BrokerFormComponent;

