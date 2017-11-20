import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {createPost} from '../actions/index'

//reduxForm is like connect... it helps connect the form to the redux store

class PostsNew extends Component{
  // field is the conventional argument here with event handlers that need to be wired up
  // It is up to us to supply the JSX
  // field argument has an event handler or two that is responsible for Field to know it is responsible for the input form
  // reduxForms deals with all event hadnlers but we just have to wire in the inputs
  // field.input has a bunch of different event handlers and props
  renderField(field){
    //destructureing on nested objects
    const {meta: {touched,error}} = field;
    const {meta} = field
    const className = `form-group ${touched && error ? 'has-danger' :''}`
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  onSubmit(values){

    this.props.createPost(values,()=>{
      this.props.history.push('/')
    })
  }

  render(){
    // We wired up reduxForm to PostNew like connect
    // connect adds some props to the component
    // Reduxform does the same
    // We pull of handleSubmit
    // Passed to component on behalf of redux form
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          //These are passed on
          label="Title for post"
          name="title"
          // We are not calling functions ourselves- this will be called later
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger" >Cancel</Link>

      </form>
    )
  }
}
//values is conventional argument
function validate(values){
  //Always created
  const errors = {};
  // Validate input from 'values
  if(!values.title||values.title.length < 3 ){ 
    errors.title = "Enter a title with at least three characters!";
  }
  if(!values.categories){
    errors.categories = "Enter come categories!";
  }
  if(!values.content){
    errors.content = "Enter some content please!!";
  }

  // if errors is empty the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  //Has to be a unique string
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);