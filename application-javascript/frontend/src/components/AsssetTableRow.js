import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class AsssetTableRow extends Component {
  constructor(props) {
    super(props) 
  }

 

  render() {
    return (
      <tr>
      <td>{this.props.obj.ID}</td>
        <td>{this.props.obj.Owner}</td>
        <td>{this.props.obj.Color}</td>
        <td>{this.props.obj.Size}</td>
        <td>{this.props.obj.AppraisedValue}</td>
        <td>
          <Link
            className="edit-link" path={"product/:id"}
            to={'/edit-asset/' + this.props.obj.ID}
          >
            Edit
          </Link>
          <Button onClick={this.TransferAsset} size="sm" variant="danger">
            Transfer
          </Button>
        </td>
      </tr>
    )
  }
}
