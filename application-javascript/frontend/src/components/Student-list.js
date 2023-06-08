import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({

          students:JSON.parse(res.data.data)
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  ConsoleDAtta(){
      console.log(this.state.students)
  }
  DataTable() {
    this.ConsoleDAtta();
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      
      
      
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Owner</th>
            <th>Colour</th>
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