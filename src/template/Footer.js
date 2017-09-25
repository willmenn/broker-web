import React, {Component} from 'react';
import * as HeaderAction from '../action/HeaderAction'

class FooterComponent extends Component {

    render() {
        return (
            <footer className="footer" style={{marginTop: 120+'px'}}>
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            <strong>BrokerScheduler</strong> por <a href="https://github.com/willmenn">William Ahrons</a>. Para ver mais detalhes acesse a nossa
                            página <a> sobre</a>.
                        </p>
                        <p>
                            <a className="icon" href="https://www.linkedin.com/in/williamahrons/">
                                <i className="fa fa-linkedin"></i>
                            </a>
                            <a className="icon" href="https://github.com/willmenn">
                                <i className="fa fa-github"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;
