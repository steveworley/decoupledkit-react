import React from 'react';
import '../styles/proxydataapi.scss';

class ProxyDataAPIApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      marker: false
    };
  }

  handleChange(event) {
    let e = event.target.value;
    this.setState({
      marker: e,
    });
  }

  render() {
    return (
      <div>
        <h4>ProxyDataAPIApp  Component</h4>
        <p>
          [ ] TODO: updated core requirements <br />
          [ ] TODO: updated core requirements <br />
          [ ] TODO: updated core requirements <br />
        </p>
        {/* <form>
          <input type="text" placeholder="Search" value={this.state.filterText} onChange={this.handleChange} />
          <p>
            {this.state.postText ? 'Your selection is: ' + this.state.filterText : ''}
          </p>
        </form> */}
      </div>
    );
  }
}

export default ProxyDataAPIApp;
