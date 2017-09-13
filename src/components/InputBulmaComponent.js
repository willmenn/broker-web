import React, {Component} from 'react';
import classnames from 'classnames';

class InputBulmaComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDanger: false,
            isWarning: false,
            isValid: false
        }
    }

    handleInputClass() {
        return classnames('input',
            {'is-danger': this.state.isDanger || this.state.isWarning},
            {'is-success': this.state.isValid});
    }

    handleDangerErrorMessage() {
        if (this.props.isDanger || this.state.isDanger) {
            return <p className="help is-danger">{this.props.errorMessage}</p>;
        } else if (this.props.isWarning || this.state.isWarning) {
            return <p className="help is-danger">{this.props.warningMessage}</p>;
        }
        return null;
    }

    inputOnChange(event) {
        this.setState({
            isDanger: false,
            isWarning: false,
            isValid: false
        });

        if (!this.props.inputPattern) {
            return null;
        }

        var value = event.target.value;

        if (this.props.isRequired && !value) {
            this.setState({isWarning: true});
            this.props.inputIsValid(false);

        } else if (!value.match(this.props.inputPattern)) {
            this.setState({isDanger: true});
            this.props.inputIsValid(false);

        } else {
            this.setState({isValid: true});
            this.props.inputIsValid(true);
        }
    }

    handleIsValid() {
        return this.state.isValid ?
            <span className="icon is-right">
                <i className="fa fa-check"></i>
            </span>
            : null;
    }

    handleDivClass() {
        return classnames('control',
            {'has-icons-right': this.state.isValid});
    }

    handleInputStyle() {
        var styles = {
            valid: {'width': '209px', 'padding-right': '0'},
            normal: {'width': '209px'}
        }
        if (this.state.isValid) {
            return styles.valid;
        }
        return styles.normal;
    }

    render() {
        return (
            <div className="field">
                {this.props.labelName ?
                    <label className="label">{this.props.labelName}</label> : null}
                <p className={this.handleDivClass()}>
                    <input className={this.handleInputClass()}
                           type={this.props.inputType}
                           style={this.handleInputStyle()}
                           placeholder={this.props.placeHolder}
                           name={this.props.name}
                           maxLength={this.props.inputMaxLength}
                           onChange={this.inputOnChange.bind(this)}
                    />
                    {this.handleIsValid()}
                    {this.handleDangerErrorMessage()}
                </p>
            </div>
        )
    }
}

export default InputBulmaComponent;