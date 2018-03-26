import React, {Component} from 'react';

class DayInputComponent extends Component {

    constructor(props){
        super(props)
        this.state = {value: this.props.value}
    }

    inputOnChange(event) {
        var value = event.target.value;
        this.setState({value:value});
    }
    render() {

        return (
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label">{this.props.dayName}</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input is-small" type="number"
                                   name={this.props.name}
                                   placeholder="Lugares"
                                   value={this.state.value}
                                   onChange={this.inputOnChange.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DayInputComponent;