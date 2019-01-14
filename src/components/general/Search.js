import React, { Component } from 'react';
import { searchUserPersonalProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";

class Search extends Component {

    handleChange = (e) => { this.props.handleSearch(e.target.value) };

    render() {
        return(
            <div className="search">
                <form className="search__form">
                    <div className="input-field">
                        <label htmlFor="search" className="search__label">Search...</label>
                        <input type="text" onChange={ this.handleChange } className="search__input" id="search"/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchUserPersonalProject: (userId, searchText) => dispatch(searchUserPersonalProject(userId, searchText))
    }
};

export default connect(null, mapDispatchToProps)(Search);