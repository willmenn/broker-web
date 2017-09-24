import React, {Component} from 'react';
import * as HeaderAction from '../action/HeaderAction'

class FooterComponent extends Component {

    render() {
        return (
            <footer className="footer" style={{padding: 3+ 'rem '+ 1.5 +'rem ' +1+'rem', marginTop: 120+'px'}}>
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            <strong>BrokerScheduler</strong> by <a href="https://github.com/willmenn">William Ahrons</a>. To more details go to our
                            <a> about</a> page.
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
