import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditAsset extends Component {

  constructor(props) {
    super(props)
    this.onChangeID= this.onChangeID.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this); 
    this.onSubmit = this.onSubmit.bind(this);
       this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      ID: '',
      Owner: '',
      Color: '',
      Size: '',
      email: '',
      Value: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/Assets/edit-asset/' + this.props.match.params.id)
      .then(res => {
        console.log(JSON.parse(res.data.data))

        this.setState({
          ID: JSON.parse(res.data.data).ID,
          Owner: JSON.parse(res.data.data).Owner,
          Color: JSON.parse(res.data.data).Color,
          Size: JSON.parse(res.data.data).Size, 
          Value: JSON.parse(res.data.data).AppraisedValue
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
    console.log(AssetObject);

    axios.put('http://localhost:4000/Assets/update-Asset/' + this.props.match.params.id, AssetObject)
      .then((res) => {
        console.log(res.data)
        console.log('Asset successfully updated')
        this.props.history.push('/asset-list')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Asset List 
    // this.props.history.push('/asset-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="ID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={this.state.ID} disabled/>
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
          Update Asset
        </Button>
      </Form>
    </div>);
  }
}