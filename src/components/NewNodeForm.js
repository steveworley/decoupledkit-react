import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewNodeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      field_history_and_background: '',
      formErrors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    const { onSubmit } = this.props
    const { title, body, field_history_and_background } = this.state
    const formErrors = {}

    event.preventDefault()

    if (title == '') {
      formErrors.title = 'You need to enter a title'
    }

    if (body == '') {
      formErrors.body = 'You need to enter some body text'
    }

    if (field_history_and_background == '') {
      formErrors.field_history_and_background = 'You need to enter history and background'
    }

    if (Object.keys(formErrors).length > 0) {
      this.setState({ formErrors })
      return
    }

    onSubmit(this.state);
    this.setState({ title: '', body: '', field_history_and_background: '' })
  }

  handleChange(event) {
    const { target,  target: { attributes: { name } }} = event
    this.setState({
      [name.value]: target.value
    })
  }

  render() {
    const { title, body, field_history_and_background, formErrors } = this.state
    const { onSubmit } = this.props

    return (
      <form onSubmit={ this.handleSubmit } className="errors">
        <div className="row">
          <h5>Create a Node</h5>
          <ul className="form-errors">
            {Object.keys(formErrors).map((fieldName, i) => {
              return (<li key={i}><strong>{fieldName}</strong> {formErrors[fieldName]}</li>)
            })}
          </ul>
          <div>
          <div className="label">{"Title"}</div>
          <input type="text" name="title" value={title} onChange={this.handleChange} />
          </div>
          <div>
          <div className="label">{"Body"}</div>
          <textarea name="body" onChange={this.handleChange} value={body} />
          </div>
          <div className="label">{"History and Background"}</div>
          <textarea name="field_history_and_background" onChange={this.handleChange} value={field_history_and_background} />
          <input type="submit" value="Create" />
        </div>
      </form>
    );
  }
}

export default NewNodeForm;
