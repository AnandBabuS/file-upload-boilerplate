import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

class App extends React.Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        console.log(event.target.files)
        this.setState({ selectedFile: event.target.files[0]})
    }

    onClick() {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8080/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
    }

    render(){
        return(
            <div>
                App
                <input type="file" id="img" onChange={this.onChange} name="img"></input>
                <div>
                <button onClick={this.onClick}>Upload</button>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('root'));
