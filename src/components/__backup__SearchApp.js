import React from 'react';

class SearchApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      filterText: '',
      postText: false
    };
  }

  handleChange(event) {
    let e = event.target.value;
    this.setState({
      filterText: e,
      postText: (e.length > 3) ? true : false
    });
  }

  render() {
    return (
      <div>
        <h4>Search Component</h4>
        <p>This component was constructed to illustrate the binding of input fields as controlled components, in addition to matching and updated props and state. This component serves as the simpler example of property tracking before diving into Redux examples.</p>
        <form>
          <input type="text" placeholder="Search" value={this.state.filterText} onChange={this.handleChange} />
          <p>
            {this.state.postText ? 'Your selection is: ' + this.state.filterText : ''}
          </p>
        </form>
      </div>
    );
  }
}

export default SearchApp;
