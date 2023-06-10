import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateAsset extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeID= this.onChangeID.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      ID: '',
      Owner: '',
      Color: '',
      Size: '',
      email: '',
      Value: ''
    }
  }

  onChangeID(e) {
    this.setState({ ID: e.target.value })
  }

  onChangeOwner(e) {
    this.setState({ Owner: e.target.value })
  }
  onChangeColor(e) {
    this.setState({ Color: e.target.value })
  }
  onChangeSize(e) {
    this.setState({ Size: e.target.value })
  }
  onChangeValue(e) {
    this.setState({ Value: e.target.value })
  }
 

  onSubmit(e) {
    e.preventDefault()

    const AssetObject = {
      ID: this.state.ID,
      Owner: this.state.Owner,
      Color: this.state.Color,
      Size: this.state.Size, 
      Value: this.state.Value
    };
    axios.post('http://localhost:4000/Assets/create-asset', AssetObject)
      .then(res => {
        console.log(res.data)
        console.log('Asset successfully updated') 
        // Redirect to Asset List 
        this.props.history.push('/asset-list')

      });

    }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="ID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={this.state.ID} onChange={this.onChangeID} />
        </Form.Group>

        <Form.Group controlId="Owner">
          <Form.Label>Owner</Form.Label>
          <Form.Control type="text" value={this.state.Owner} onChange={this.onChangeOwner} />
        </Form.Group>



        <Form.Group controlId="Color">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" value={this.state.Color} onChange={this.onChangeColor} />
        </Form.Group>



        <Form.Group controlId="Size">
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" value={this.state.Size} onChange={this.onChangeSize} />
        </Form.Group>


        <Form.Group controlId="Value">
          <Form.Label>Value</Form.Label>
          <Form.Control type="text" value={this.state.Value} onChange={this.onChangeValue} />
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Asset
        </Button>
      </Form>
    </div>);
  }
}