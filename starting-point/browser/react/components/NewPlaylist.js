import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {
  constructor (props){
    super(props);
    this.state = {
      input: "",
      disabled: true,
      dirty:false   
    }
    this.submitting = this.submitting.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.disable = this.disable.bind(this);
    this.dirty = this.dirty.bind(this)
  }


submitting(event){
  event.preventDefault()

  this.setState({input: event.target.value })
  this.disable(event.target.value)
  this.dirty()
  
}
createPlaylist(event){
  event.preventDefault()
  this.setState({input: ""})

  axios.post('/api/playlists',  {name:this.state.input})
  .then(res => res.data)
  .then(result => {
    console.log(result) // response json from the server!
  });





}
disable(str){
  console.log('disable state', this.state.disabled)
  if(str === '' || str.length > 15){
    this.setState({disabled: true})
  } else {
    this.setState({disabled: false})
  }
}

dirty(){
  this.setState({dirty:true})
}


  render (){ 
    var disabled = this.state.disabled ? 'disabled' : '';
    return (
    <div className="well">
      <form onSubmit={this.createPlaylist} className="form-horizontal">
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input className="form-control" type="text" onChange={this.submitting} value={this.state.input}/>
              {!this.state.input.length && this.state.dirty ? (<div className="alert alert-warning">Please enter a name</div>) : ""}
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success" disabled={disabled}>Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    )
  }
}