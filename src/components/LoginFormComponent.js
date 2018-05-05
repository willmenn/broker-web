import React, {Component} from 'react';
import * as LoginAction from '../action/LoginAction';
import LoginStore from '../store/LoginStore'
import InputBulmaComponent from './InputBulmaComponent'
import classnames  from 'classnames';

const displayNone = {
    display: 'none'
}

const displayBlock = {
    display: 'block',
    fontSize: '12px',
    marginBottom: 0
}

class LoginFormComponent extends Component {


    constructor() {
        super();
        this.state = {
            loginLoading: false,
            error: false,
            inputUsuarioValid: false,
            inputSenhaValid: false
        }
    }

    componentWillMount() {
        LoginStore.on('loginChange', () => {
            console.log("loginChange")
            this.setState({loginLoading: LoginStore.getLoginState()});
        });
        LoginStore.on('errorLoginChange', () => {
            console.log("errorLoginChange")
            this.setState({
                error: LoginStore.getErrorLoginState(),
                loginLoading: LoginStore.setLoginStateToDefault()
            });
        })
    }

    onSubmit(evt) {
        let data = this.createFormData(evt);
        LoginAction.loginAction(data);
        evt.preventDefault();
        return false;
    }

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        console.log(body);
        return body;
    }

    submitButtonStateHandler() {
        return classnames('button is-primary',
            {'is-loading': this.state.loginLoading});
    }

    resetLoginForm() {
        this.setState({loginLoading: LoginStore.setLoginStateToDefault()});
    }

    handleNotificationExitButton() {
        this.setState({loginLoading: LoginStore.setLoginStateToDefault()});
        this.setState({error: LoginStore.setErrorLoginStateToDefault()});
    }

    handleUsuarioInputValidation(isValid) {
        this.setState({inputUsuarioValid: isValid});
    }

    handleSenhaInputValidation(isValid) {
        this.setState({inputSenhaValid: isValid});
    }

    loginButtonDisable(){
        return !this.state.inputSenhaValid || !this.state.inputUsuarioValid;
    }

    render() {
        return (
            <div className="box" style={{backgroundColor: 'whitesmoke'}}>
                <form classID="loginForm" onSubmit={this.onSubmit.bind(this)}>
                    <InputBulmaComponent
                        customStyle={{width: 209 + 'px'}}
                        placeHolder="Nome do Gerente"
                        name="manager"
                        labelName="Usuário:"
                        inputType="text"
                        inputMaxLength="20"
                        errorMessage="Usuário inválido."
                        warningMessage="Usuário não pode ser vazio."
                        inputIsValid={this.handleUsuarioInputValidation.bind(this)}
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
                        errorMessage="Senha inválida."
                        warningMessage="A Senha não pode ser vazio."
                        inputIsValid={this.handleSenhaInputValidation.bind(this)}
                        isRequired="true"
                        inputPattern={/[a-zA-Z]{0,}[0-9]{0,}/}
                    />

                    <div className="field is-grouped">
                        <p className="control">
                            <button className={this.submitButtonStateHandler()} type="submit" disabled={this.loginButtonDisable()}>Login</button>
                        </p>
                        <p className="control">
                            <button className="button is-link" type="reset" onClick={() => this.resetLoginForm()}>
                                Cancel
                            </button>
                        </p>
                    </div>
                    <div className="notification is-danger"
                         style={this.state.error ? displayBlock : displayNone}>
                        <button type='reset' className="delete"
                                onClick={() => this.handleNotificationExitButton()}></button>
                        Por favor tente novamente.
                    </div>
                </form>
            </div >
        )
    }

}

export default LoginFormComponent;