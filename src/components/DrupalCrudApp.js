import React from 'react';
import '../styles/drupalcrud.scss';

class DrupalCrudApp extends React.Component {

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
        <h4>Drupal CRUD Component</h4>
        <p>
          <b>Story:</b> As a developer, I want to understand common CRUD operations when interacting with the Drupal JSON API endpoints.
        </p>

        <ul>
          <li>Setup a common data schema as a single content types in Drupal using the Headless Lightning distro located at https://github.com/acquia-pso/javascript-ps-starter-headlessdrupal</li>
          <li>Show the ability to create a new node of that content type (create)</li>
          <li>Show a list of the available nodes to choose from. (read)</li>
          <li>Show the ability to update an existing node of that content type (update)</li>
          <li>Show the ability to delete a node of that content type (delete)</li>
        </ul>



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

export default DrupalCrudApp;
