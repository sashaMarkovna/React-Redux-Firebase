import React, { Component } from 'react';
import {updateUserName} from "../../../store/actions/authActions";
import { connect } from 'react-redux';

class ChangeUserNameForm extends Component {

    state = {
        buttonDisabled: () => !this.state.changeUserName.firstName && !this.state.changeUserName.lastName,
        changeUserName: {
            firstName: '',
            lastName: ''
        }
    };

    handleChange = (e) => {
        this.setState({
            changeUserName: {
                ...this.state.changeUserName,
                [e.target.id]: e.target.value
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserName(this.state.changeUserName);
        this.setState({
            changeUserName: {
                firstName: '',
                lastName: ''
            }
        });
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
    };

    render() {
        const { profile } = this.props;
        return (
            <form onSubmit={ this.handleSubmit } className="white change-user-name-form">
                <div className="input-field">
                    <label htmlFor="firstName" className="active">First Name</label>
                    <input
                        placeholder={ profile.firstName }
                        type="text"
                        id="firstName"
                        onChange={ this.handleChange }
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName" className="active">Last Name</label>
                    <input
                        placeholder={ profile.lastName }
                        type="text"
                        id="lastName"
                        onChange={ this.handleChange }
                    />
                </div>
                <div className="input-field">
                    <button
                        onClick={ this.handleSubmit }
                        disabled={ this.state.buttonDisabled() }
                        className="btn pink lighten-1 z-depth-0 ">
                        Submit Changes
                    </button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserName: (newName) => dispatch(updateUserName(newName)),
    }
};

export default connect(null, mapDispatchToProps)(ChangeUserNameForm);