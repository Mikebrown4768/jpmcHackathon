import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class InputAndSubmit extends React.Component {
    constructor(props) {
        super(props)

    this.state = {
        toSearch : ""
    }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            toSearch : event.target.value
        })
       }

    handleSubmit(event) {
        event.preventDefault();
     //   this.getData(this.state.toSearch)
    }
    
    render() {
        return <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control placeholder="Enter Company Name" onChange = {this.handleChange}/>
                <Form.Text className="text-muted">
                   Press Search for information about the inputed company!
                    </Form.Text>
                </Form.Group>
                <Link to='/PostSubmitPage' state={{companyName : this.state.toSearch}}
                  type="submit" className="btn btn-primary">Search</Link>
            </Form>
        </div>
    }

    getData(input) {
        axios({
            method: "GET",
            url:"/article/",
            params: {
                companyName: input
            }
          }).then((response)=>{
            const data = response.data
            const convertedData = this.convertData(data)
            console.log(convertedData[0].title)
            console.log(convertedData[0].author)
            console.log(convertedData[0].time)
            console.log(convertedData[0].completeLink)
            console.log(convertedData[0].imgSource)       
          }).catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
              }
          })}

    convertData(data) {
        var parsed = JSON.parse(data);
        return parsed
        
    }
}

export default InputAndSubmit