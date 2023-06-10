import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class AsssetTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteAsset = this.deleteAsset.bind(this)
  }

  deleteAsset() {
    axios
      .delete(
        'http://localhost:4000/Assets/delete-Asset/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Asset successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
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
          <Button onClick={this.deleteAsset} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}
