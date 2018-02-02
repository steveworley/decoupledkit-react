import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CreateHeroForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''}
    this.onUpdate = this.onUpdate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onUpdate(event) {
    this.setState({name: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.name.length > 0) {
      this.props.handleSubmit(this.state.name)
    }
    this.setState({name: ''})
  }

  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="label">{"Name"}</div>
          <input type="text" value={name} onChange={this.onUpdate} />
          <p style={{fontSize: "small"}}>Enter a valid Marvel character, this will instruct the graphQL server to update its database with values from the Marvel API based on the hero name.</p>
          <input type="submit" value={`Add ${name}`} />
        </div>
      </form>
    )
  }
}

CreateHeroForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default CreateHeroForm
