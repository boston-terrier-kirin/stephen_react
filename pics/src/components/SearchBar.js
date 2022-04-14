import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div class="ui segment">
        <form class="ui form">
          <div className="field">
            <label>Image Search</label>
            <input type="text" />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
