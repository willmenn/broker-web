import React, {Component} from 'react';
import 'bulma/css/bulma.css'

const customizedCss = {
    width: '1000px',
    margin: 'auto',
    paddingTop: '50px'
}


class AppBodyComponent extends Component {
    render() {
        return (
            <div>
                <div className="columns is-desktop" style={customizedCss}>
                    {this.props.children}
                </div>
            </div >
        );
    }
}
export default AppBodyComponent;
