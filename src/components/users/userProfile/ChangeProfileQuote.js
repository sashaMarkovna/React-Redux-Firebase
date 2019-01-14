import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { updateUserData } from "../../../store/actions/authActions";

class ChangeProfileQuote extends Component {

    state = {
        symbolsLimit: 150,
        data: { profileQuote: '' }
    };

    handleChange = (e) => {
        this.setState({ ...this.state, data: { profileQuote: e.target.value }}, () => {
            this.setState({ ...this.state, symbolsLimit: 150 - this.state.data.profileQuote.length });
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserData(this.state.data);
        this.props.toggleEditQuoteModal();
    };


    render() {
        console.log(this.state);
        return (
            <div className="modal-window">
                <form onSubmit={this.handleSubmit} className="white">
                    <i className="fas fa-times right modal-window__close-icon" onClick={ this.props.toggleEditQuoteModal }/>
                    <h5 className="grey-text text-darken-3">Profile quote</h5>
                    <div className="input-field">
                        <label htmlFor="quote">Tell everyone...</label>
                        <textarea
                            className="materialize-textarea"
                            id="quote"
                            onChange={this.handleChange}
                            ref={c => this.textarea = c}
                            maxLength="150"
                        />
                    </div>
                    { this.state.symbolsLimit > 0 ? ( <p className="change-profile-quote__symbols-message">{ this.state.symbolsLimit }</p> ) : null }
                    { this.state.symbolsLimit <= 0 ? ( <p className="change-profile-quote__error-message">Oops, too many symbols! Maybe it's better to white a post? </p> ) : null }
                    <div className="input-field form__buttons">
                        <button className="btn teal lighten-1 z-depth-0 submit" disabled={ this.state.symbolsLimit < 0 || this.state.symbolsLimit === 150 }>Add</button>
                        <button className="btn pink lighten-1 z-depth-0" onClick={ this.props.toggleEditQuoteModal }>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (newData) => dispatch(updateUserData(newData))
    }
};

export default connect(null, mapDispatchToProps)(ChangeProfileQuote);