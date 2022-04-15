import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  // 解決１:bindする
  // constructor(props) {
  //   super(props);
  //   this.onFormSubmit = this.onFormSubmit.bind(this);
  // }

  // 解決２：onSubmitをアロー関数の中で呼び出すことで、thisが固定されるので、問題が解決できる。
  // onFormSubmit(event) {
  //   event.preventDefault();
  //   // いつも起きる問題。この時、this は undefined になっている。
  //   console.log(this);
  //   console.log(this.state.term);
  // }

  // 解決３：onFormSubmit 自体をアロー関数にして、thisを固定する。
  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form
          className="ui form"
          // 解決２：onSubmitをアロー関数の中で呼び出すことで、thisが固定されるので、問題が解決できる。
          // onSubmit={(event) => this.onFormSubmit(event)}

          // 解決３：onFormSubmit 自体をアロー関数にして、thisを固定する。
          onSubmit={this.onFormSubmit}
        >
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
