import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearProp, deleteUserAccount } from "../../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import Link from "react-router-dom/es/Link";

class DeleteAccount extends Component {

    state = {
        password: '',
        confirmDeleteUser: false,
        authError: ''
    };

    handleClick = () => {
        this.setState({
            ...this.state,
            confirmDeleteUser: true
        });

    };

    handleChange = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.deleteUserAccount(this.state.password);
    };

    render(){

        const { auth, authDeleteAccountErrorMessage } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>;

        return (
            <div className="container delete-user-component" style={{marginBottom: '50px'}}>
                <div className="container white delete-user-container">
                    <div className="delete-user-block container">
                        { !this.state.confirmDeleteUser ? <h2>Oh No...</h2> : null }
                        { this.state.confirmDeleteUser ? <h2>Ok...</h2> : null }
                        <div className="container delete-user__img">
                            <img className="responsive-img " src="/img/crying.jpg" alt=""/>
                        </div>
                        { !this.state.confirmDeleteUser ? <h3>Are you sure?</h3> : null }
                        { this.state.confirmDeleteUser ? <h3>But I need your password</h3> : null }
                    </div>
                    <div className="container center delete-user__form-button-block">
                        { this.state.confirmDeleteUser ?
                            (<form onSubmit={this.handleSubmit} className="white change-email-form" id="pass-form">
                                <div className="input-field" id="aaa">
                                    <label htmlFor="password">Password please</label>
                                    <input
                                        autoFocus={true}
                                        type="password"
                                        id="password"
                                        onChange={ this.handleChange }/>
                                </div>
                                { authDeleteAccountErrorMessage ? <p className="update-error-message">{ authDeleteAccountErrorMessage }</p> : null }
                                <button className="btn pink lighten-1 z-depth-0 delete-user__button" style={{margin: '10px 0 10px 0'}}>Farewell...</button>
                            </form>)
                        : null }

                        { !this.state.confirmDeleteUser ? <button onClick={ this.handleClick } className="btn pink lighten-1 z-depth-0 delete-user__button">Yep!</button> : null }
                        <Link to={'/user/' + auth.uid} className="btn #26a69a lighten-1 z-depth-0 delete-user__button">No no, don't cry</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authDeleteAccountErrorMessage: state.auth.authDeleteAccountErrorMessage,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserAccount: (password) => dispatch(deleteUserAccount(password)),
        clearProp: (prop) => dispatch(clearProp(prop))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);