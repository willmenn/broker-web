import React, {Component} from 'react';

class LoginHeaderComponent extends Component {

    render() {
        return (<section className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Entre no Sistema
                        </h1>
                        <h2 className="subtitle">
                            para gerar escalas para a sua equipe de corretores.
                        </h2>
                    </div>
                </div>
            </section>
        )
    }
}

export default LoginHeaderComponent;