import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comic extends Component {
  constructor(props) {
    super(props)
    this.state = { showinfo: false }
  }
  onClick(e) {
    e.preventDefault()
    this.setState({showinfo: !this.state.showinfo})
  }
  render() {
    const { title, description, image, sales } = this.props
    const classes = this.state.showinfo ? 'row show' : 'row hide'
    const containerClass = this.state.showinfo ? 'comic active' : 'comic'

    const Sales = sales.map(sale => {
      return (
        <tr key={sale.issue}>
          <td>{sale.issue}</td>
          <td>{sale.count}</td>
        </tr>
      )
    })

    return (
      <div className={containerClass}>
        <p><a href="#" onClick={this.onClick.bind(this)}>{title}</a></p>
        <div className={classes}>
          <div className="col">
            <p><strong>{"Image"}</strong></p>
            <p style={{textAlign:"center"}}><img src={image} /></p>
          </div>
          <div className="col">
            <p><strong>{"Title"}</strong> <span className="api-source api-source-marvel">Marvel API</span></p>
            {title}
            <p><strong>{"Description"}</strong></p>
            {description}
          </div>
          <div style={{clear: "both"}}>
            <p><strong>{"Sales"}</strong> <span className="api-source api-source-sales">Comic Sales API</span></p>
            <table>
              <tbody>
                <tr>
                  <th>Issue</th>
                  <th>Count</th>
                </tr>
                { Sales }
              </tbody>
            </table>
          
          </div>
        </div>
      </div>
    )
  }
}

export default Comic;
