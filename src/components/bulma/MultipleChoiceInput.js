import React, {Component} from 'react';
import classnames from 'classnames';

class MultipleChoiceInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actives: []
        }
    }

    onClick(name) {
        let arr;
        if (this.isActive(name)) {
            arr = this.state.actives.filter(value => value !== name);
        } else {
            this.state.actives.push(name);
            arr = this.state.actives;
        }
        this.setState({actives: arr});
    }

    isActive(name) {
        return this.props.actives.find(value => value === name);
    }

    render() {
        return (
            <div className="field">
                <label className="label">{this.props.title}</label>
                <div className="field is-grouped is-grouped-multiline">
                    {this.props.data.map(d =>
                        <p className="control">
                            <a className={this.isActive(d) ? "button is-info is-outlined" : "button is-outlined"}
                               onClick={() => this.props.onClick(d)}>
                                {d}
                            </a>
                        </p>)
                    }
                </div>
            </div>
        )
    }
}

export default MultipleChoiceInput;