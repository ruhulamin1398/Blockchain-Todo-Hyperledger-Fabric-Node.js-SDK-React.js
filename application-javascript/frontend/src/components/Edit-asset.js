import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditAsset extends Component {

  constructor(props) {
    super(props)
    this.onChangeID= this.onChangeID.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeColour = this.onChangeColour.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
       this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      ID: '',
      Owner: '',
      Colour: '',
      Size: '',
      email: '',
      Value: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/Assets/edit-asset/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeID(e) {
    this.setState({ ID: e.target.value })
  }

  onChangeOwner(e) {
    this.setState({ Owner: e.target.value })
  }
  onChangeColour(e) {
    this.setState({ Colour: e.target.value })
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
      Colour: this.state.Colour,
      Size: this.state.Size, 
      Value: this.state.Value
    };

    axios.put('http://localhost:4000/Assets/update-Asset/' + this.props.match.params.id, AssetObject)
      .then((res) => {
        console.log(res.data)
        console.log('Asset successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Asset List 
    this.props.history.push('/asset-list')
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



        <Form.Group controlId="Colour">
          <Form.Label>Colour</Form.Label>
          <Form.Control type="text" value={this.state.Colour} onChange={this.onChangeColour} />
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
          Update Asset
        </Button>
      </Form>
    </div>);
  }
}