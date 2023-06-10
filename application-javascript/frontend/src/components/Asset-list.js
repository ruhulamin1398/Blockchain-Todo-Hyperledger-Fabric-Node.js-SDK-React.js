import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AssetTableRow from './AsssetTableRow';


export default class AssetList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Assets: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/Assets/')
      .then(res => {
        this.setState({

          Assets:JSON.parse(res.data.data)
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  ConsoleDAtta(){
      console.log(this.state.Assets)
  }
  DataTable() {
    this.ConsoleDAtta();
    return this.state.Assets.map((res, i) => {
      return <AssetTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      
      
      
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Color</th>
            <th>Size</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
 
 
          {this.DataTable()}
        </tbody>
      </Table>



    </div>);
  }
}