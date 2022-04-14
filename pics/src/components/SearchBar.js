import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit(event) {
    event.preventDefault();

    // いつも起きる問題。この時、this は undefined になっている。
    console.log(this);
    console.log(this.state.term);
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
