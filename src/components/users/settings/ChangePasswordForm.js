import React, { Component } from 'react';
import { changeUserEmailOrPassword } from "../../../store/actions/authActions";
import { connect } from 'react-redux';

class ChangePasswordForm extends Component {

    state = {
        messageSuccess: '',
        messagePasswordError: '',
        messageConfirmError: '',
        inputDisabled: true,
        buttonContent: 'CHANGE',
        displayDropdown: 'none',
        confirmPassword: false,
        confirmInputIndicateColor: () => this.state.confirmPassword ? '#26a69a' : '#9e9e9e',
        confirmLabelContent: () => this.state.confirmPassword ? 'Yep...' : 'One more time, please...',
        passwordInputLabelContent: () => this.state.inputDisabled ? 'Password' : 'Old Password',
        passwordInputPlaceholderContent: () => this.state.inputDisabled ? '...........' : '',
        newCredentials: {
            update: 'password',
            newPassword: '',
            password: ''
        }
    };

    handleDropdown = () => {
        this.setState ({
            displayDropdown:  this.state.displayDropdown === 'none' ? 'block' : 'none',
            buttonContent: this.state.buttonContent === 'CHANGE' ? 'CANCEL' : 'CHANGE',
            inputDisabled: !this.state.inputDisabled,
            confirmPassword: false,
            messageSuccess: '',
            messagePasswordError: '',
            messageConfirmError: '',
        });
        document.getElementById('label-password').classList.remove('active');
        document.getElementById('label-confirm-pass').classList.remove('active');
        [].forEach.call(document.getElementById('changePasswordForm').getElementsByClassName('pass-input'), elem => { elem.value = '' });
        this.passwordInput.focus();
    };

    handleChange = (e) => {
        if(e.target.id === 'currentPassword') {
            this.setState({
                newCredentials: {
                    ...this.state.newCredentials,
                    password: e.target.value
                }
            });
        } else {
            this.setState({
                newCredentials: {
                    ...this.state.newCredentials,
                    [e.target.id]: e.target.value
                }
            });
        }
    };

    handleConfirmPassword = (e) => {
        e.target.value === this.state.newCredentials.newPassword ? this.setState({ confirmPassword: true }) : this.setState({ confirmPassword: false });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.confirmPassword) {
            this.setState ({
                messageConfirmError: 'Your new password and confirmation password do not match. Please confirm and try again.'
            })
        } else {
            console.log(this.state);
            this.props.changeUserEmailOrPassword(this.state.newCredentials);
        }
    };

    componentDidUpdate(prevProps) {
        if(this.props.authPasswordUpdateSuccessMessage !== prevProps.authPasswordUpdateSuccessMessage && this.props.authPasswordUpdateSuccessMessage) {
            this.handleDropdown();
            this.setState({ messageSuccess: this.props.authPasswordUpdateSuccessMessage });
        } else if(this.props.authPasswordUpdatePasswordError !== prevProps.authPasswordUpdatePasswordError && this.props.authPasswordUpdatePasswordError) {
            this.setState({ messagePasswordError: this.props.authPasswordUpdatePasswordError });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="change-password-form white" id="changePasswordForm">
                <div className="input-field">
                    <label htmlFor="email" className="active">{ this.state.passwordInputLabelContent() }</label>
                    <div className="dropdown-trigger-input">
                        <input
                            ref={(input) => { this.passwordInput = input; }}
                            readOnly={ this.state.inputDisabled }
                            placeholder={this.state.passwordInputPlaceholderContent()}
                            type="password"
                            id="currentPassword"
                            onChange={this.handleChange}
                            tabIndex="3"
                            className="pass-input"
                        />
                        <input
                            readOnly={true}
                            type="button"
                            onClick={ this.handleDropdown }
                            className="btn pink lighten-1 z-depth-0 dropdown-trigger-input__button"
                            id="changeButton"
                            value={ this.state.buttonContent }
                        />
                    </div>
                </div>
                { this.state.messagePasswordError ? <p className="update-error-message">{ this.state.messagePasswordError }</p> : null }
                { this.state.messageSuccess ? <p className="update-success-message">{ this.state.messageSuccess }</p> : null }
                <div style={{ display: `${ this.state.displayDropdown }`}}>
                    <div className="input-field">
                        <label id="label-password" htmlFor="password">New Password</label>
                        <input
                            required={true}
                            type="password"
                            id="newPassword"
                            onChange={this.handleChange}
                            tabIndex="4"
                            className="pass-input"
                        />
                    </div>
                    <div className="input-field">
                        <label
                            id="label-confirm-pass"
                            htmlFor="password"
                            style={{color: `${this.state.confirmInputIndicateColor()}`}}>
                            { this.state.confirmLabelContent() }
                        </label>
                        <input
                            required={true}
                            type="password"
                            id="confirmPassword"
                            onChange={this.handleConfirmPassword}
                            tabIndex="5"
                            className="pass-input"
                        />
                    </div>
                    { this.state.messageConfirmError ? <p className="update-error-message">{ this.state.messageConfirmError }</p> : null }
                    <button onClick={ this.handleSubmit } className="btn pink lighten-1 z-depth-0 ">Confirm</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      authPasswordUpdatePasswordError: state.auth.authPasswordUpdatePasswordError,
      authPasswordUpdateSuccessMessage: state.auth.authPasswordUpdateSuccessMessage
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserEmailOrPassword: (newCredentials) => dispatch(changeUserEmailOrPassword(newCredentials))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);