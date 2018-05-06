import React, {Component} from 'react';

class DayInputComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {valueMorning: "", valueAfternoon: "", valueNight: ""}
    }

    inputOnChange(event) {
        var value = event.target.value;
        console.log(value)
        var morning = this.state.valueMorning;
        var afternoon = this.state.valueAfternoon;
        var night = this.state.valueNight;
        if (event.target.name === 'Manha') {
            this.setState({valueMorning: value});
            morning = value;
        } else if (event.target.name === 'Tarde') {
            this.setState({valueAfternoon: value});
            afternoon = value;
        } else if (event.target.name === 'Noite') {
            this.setState({valueNight: value});
            night = value;
        }

        this.props.dayChange({
            morning: morning,
            afternoon: afternoon,
            night: night
        });
    }

    render() {

        return (
            <div className="column is-narrow box">
                <label className="label">{this.props.dayName}</label>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Manhã:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input is-small" type="number"
                                       name="Manha"
                                       placeholder="Lugares"
                                       value={this.state.valueMorning}
                                       onChange={this.inputOnChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Tarde:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input is-small" type="number"
                                       name="Tarde"
                                       placeholder="Lugares"
                                       value={this.state.valueAfternoon}
                                       onChange={this.inputOnChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Noite:</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input is-small" type="number"
                                       name="Noite"
                                       placeholder="Lugares"
                                       value={this.state.valueNight}
                                       onChange={this.inputOnChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DayInputComponent;