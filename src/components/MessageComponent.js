import React, {Component} from 'react';
import * as LoginAction from '../action/LoginAction';
import LoginStore from '../store/LoginStore'
import InputBulmaComponent from './bulma/InputBulmaComponent'
import classnames from 'classnames';
import {saveMessage} from "../action/MessageAction";


const customizedCss = {
    margin: 'inherit'
}

class MessageComponent extends Component {

    constructor(props) {
        super(props);
    }

    createFormData(evt) {
        let body = Array.from(evt.target.elements)
            .filter(el => el.name)
            .reduce((a, b) => ({...a, [b.name]: b.value}), {});

        console.log(body);
        return body;
    }

    onSubmit(evt) {
        let data = this.createFormData(evt);
        saveMessage(data.message, this.props.manager);
        evt.preventDefault();
        return false;
    }

    render() {
        return (
            <div style={customizedCss}>
                {
                    this.props.broker === false ?
                        <form onSubmit={this.onSubmit.bind(this)} style={{marginBottom: "10px"}}>
                            <div className="field">
                                <div className="control">
                                    <textarea className="textarea"
                                              type="text"
                                              placeholder="Adicione um recado para a sua equipe."
                                              name="message"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="button is-info">Enviar</button>
                        </form>
                        : null
                }
                {
                    this.props.messages.length > 0 ? this.props.messages.map(m =>
                            <article className="message">
                                <div className="message-body">
                                    {m.message}
                                </div>
                            </article>
                        )
                        :
                        <div className="content" style={{textAlign: 'center'}}>
                            <h3>A sua equipe não tem nenhum recado.</h3>
                        </div>
                }
            </div>
        )
    }

}

export default MessageComponent;