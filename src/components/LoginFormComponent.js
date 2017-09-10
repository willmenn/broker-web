import React, {Component} from 'react';
import * as LoginAction from '../action/LoginAction';
import LoginStore from '../store/LoginStore'

class LoginFormComponent extends Component {


    constructor() {
        super();
        this.state = {
            loginLoading: false
        }
    }

    componentWillMount() {
        LoginStore.on('loginChange', () => {
            console.log("loginChange")
            this.setState({loginLoading: LoginStore.getLoginState()});
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

    submitButtonStateHandler(){
        return this.state.loginLoading ? "button is-primary is-loading" : "button is-primary";
    }

    resetLoginForm(){
        this.setState({loginLoading: LoginStore.setLoginStateToDefault()});
    }

    render() {
        return (
            <div className="box">
                <form classID="loginForm" onSubmit={this.onSubmit.bind(this)}>
                    <div className="field">
                        <label className="label">Usuário:</label>
                        <p className="control">
                            <input className="input" type="text"
                                   placeholder="Nome do Gerente" name="manager"/>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Senha:</label>
                        <p className="control">
                            <input className="input" type="password"
                                   placeholder="Senha" name="password"/>
                        </p>
                    </div>

                    <div className="field is-grouped">
                        <p className="control">
                            <button className={this.submitButtonStateHandler()} type="submit">Login</button>
                        </p>
                        <p className="control">
                            <button className="button is-link" type="reset"  onClick={() => this.resetLoginForm()}>Cancel</button>
                        </p>
                    </div>
                </form>
            </div >
        )
    }

}

export default LoginFormComponent;