import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cleanSearchState, selectedSearch } from '../../store/actions/searchActions';

class Search extends Component {

  handleChange = (e) => { this.props.handleSearch(e.target.value); };

  render() {
    return (
      <div className="search">
        <form className="search__form">
          <div className="input-field">
            <label htmlFor="search" className="search__label">Search...</label>
            <input type="text" onChange={this.handleChange} className="search__input" id="search" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectedSearch: (collection, field, searchText) => dispatch(selectedSearch(collection, field, searchText)),
    cleanSearchState: () => dispatch(cleanSearchState()),
  };
};

export default connect(null, mapDispatchToProps)(Search);
