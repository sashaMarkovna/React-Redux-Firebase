import React, { Component } from 'react';
import { changeUserEmailOrPassword } from "../../../store/actions/authActions";
import { connect } from 'react-redux';

class ChangeEmailForm extends Component {

    state = {
        messageSuccess: '',
        messageEmailError: '',
        messagePasswordError: '',
        emailInputDisabled: true,
        emailButtonContent: 'CHANGE',
        displayEmailDropdown: 'none',
        newCredentials: {
            update: 'email',
            newEmail: '',
            password: ''
        }
    };

    handleDropdown = () => {
        this.setState ({
            ...this.state,
            messageSuccess: '',
            messageEmailError: '',
            messagePasswordError: '',
            displayEmailDropdown:  this.state.displayEmailDropdown === 'none' ? 'block' : 'none',
            emailButtonContent: this.state.emailButtonContent === 'CHANGE' ? 'CANCEL' : 'CHANGE',
            emailInputDisabled: !this.state.emailInputDisabled
        });
        document.getElementById('newEmail').value = '';
        document.getElementById('newEmail').placeholder = this.props.auth.email;
        document.getElementById('password').value = '';
        this.emailInput.focus();
    };

    handleChange = (e) => {
        this.setState({
            newCredentials: {
                ...this.state.newCredentials,
                [e.target.id]: e.target.value
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.changeUserEmailOrPassword(this.state.newCredentials);
    };

    componentDidUpdate(prevProps) {
        if(this.props.authEmailUpdateSuccessMessage !== prevProps.authEmailUpdateSuccessMessage && this.props.authEmailUpdateSuccessMessage) {
            this.handleDropdown();
            this.setState({ messageSuccess: this.props.authEmailUpdateSuccessMessage });
        } else if(this.props.authEmailUpdateEmailError !== prevProps.authEmailUpdateEmailError && this.props.authEmailUpdateEmailError) {
            this.setState({ messageEmailError: this.props.authEmailUpdateEmailError });
        } else if(this.props.authEmailUpdatePasswordError !== prevProps.authEmailUpdatePasswordError && this.props.authEmailUpdatePasswordError) {
            this.setState({ messagePasswordError: this.props.authEmailUpdatePasswordError });
        }
    }

    render() {
        const { auth } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className="white change-email-form">
                <div className="input-field">
                    <label htmlFor="email" className="active">Email</label>
                    <div className="dropdown-trigger-input">
                        <input
                            readOnly={ this.state.emailInputDisabled }
                            ref={(input) => { this.emailInput = input; }}
                            placeholder={ auth.email }
                            type="email"
                            id="newEmail"
                            onChange={ this.handleChange }
                            tabIndex="1"
                        />
                        <input
                            readOnly={ true }
                            type="button"
                            onClick={ this.handleDropdown }
                            className="btn pink lighten-1 z-depth-0 dropdown-trigger-input__button"
                            value={ this.state.emailButtonContent }
                        />
                    </div>
                    { this.state.messageSuccess  ? <p className="left update-success-message">{ this.state.messageSuccess }</p> : null }
                    { this.state.messageEmailError ? <p className="update-error-message">{ this.state.messageEmailError }</p> : null }
                    <div style={{ display: `${ this.state.displayEmailDropdown }`}}>
                        <div className="input-field">
                            <label htmlFor="password">Password please</label>
                            <input
                                type="password"
                                id="password"
                                onChange={ this.handleChange }
                                tabIndex="2"
                            />
                        </div>
                        { this.state.messagePasswordError ? <p className="update-error-message">{ this.state.messagePasswordError }</p> : null }
                        <button onClick={ this.handleSubmit } className="btn pink lighten-1 z-depth-0 ">Confirm</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authEmailUpdateEmailError: state.auth.authEmailUpdateEmailError,
        authEmailUpdateSuccessMessage: state.auth.authEmailUpdateSuccessMessage,
        authEmailUpdatePasswordError: state.auth.authEmailUpdatePasswordError,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserEmailOrPassword: (newCredentials) => dispatch(changeUserEmailOrPassword(newCredentials))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailForm);