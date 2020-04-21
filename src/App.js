import React, { Component } from 'react';
import './App.css';
import { MdAddCircle } from 'react-icons/md';

function validate (title, poster, comment) {
  return{
      title: title.length === 0,
      poster: poster.length === 0,
      comment: comment.length === 0,
  };
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      poster: "",
      comment: "",
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
};

handleSubmit = (event) => {
  event.preventDefault();
  this.setState({
    title: "",
    poster: "",
    comment: "",
  })

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(this.state),
  };
  
  const url = "https://post-a-form.herokuapp.com/api/movies/";

  fetch(url, config)
  .then(res => res.json())
    .then(res => {
      if (res.error) {
        alert(res.error);
      } else {
        alert(`Movie ${res.title} has been successfully added!`);
      }
    }).catch(e => {
      console.error(e);
      alert('There was an error when adding the movie.');
    });

}

  render(){
    const { title, poster, comment } = this.state
    const errors = validate(title, poster, comment);
        let isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <form className="add-movie-form" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Movie name:</label>
        <input type="text" value={title} onChange={this.handleChange} className="form-input" id="title" name='title' />

        <label htmlFor="poster">Movie Poster Url:</label>
        <input type="text" value={poster} onChange={this.handleChange} className="form-input" id="poster" name='poster' />
                
        <label htmlFor="comment">Movie comment:</label>
        <textarea value={comment} onChange={this.handleChange} className="form-input" id="comment" name='comment' />

        <button type="submit" disabled={isDisabled} className={isDisabled? "btn-disabled": "btn-enabled"}><MdAddCircle className={isDisabled? "icon-disabled": "icon-enabled"}/></button>
      </form>
    );
  }
 
}

export default App;
