import React from 'react';
import {reduxForm, Field} from 'redux-form';



class StreamForm extends React.Component{
    renderInput=({input,label,meta})=>{
        //console.log(meta);
        return (
            <div className = "field">
                <label>{label}</label>
                <input value = {input.value} onChange = {input.onChange} autoComplete ="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    renderError=(meta)=>{
        //console.log(meta);
        if(meta.touched&&meta.error){
            return (
                <div className = "ui error message">
                    <div className = "header">{meta.error}</div>
                </div>
            );
        }
   
    }
    onSubmit=(formValues)=>{
        this.props.onSubmit(formValues);
    }

    render(){
        //console.log(this.props);
        return (
            <form className = "ui form error" onSubmit = {this.props.handleSubmit(this.onSubmit)}>
                <Field name = "title" component = {this.renderInput} label="Enter Title:"/>
                <Field name = "description" component = {this.renderInput} label="Enter Description:"/>
                <button className = "ui button primary">Submit</button>
            </form>
        );
    }
}

const validate =formValues=>{
    const errors = {};
    if(!formValues.title)
        errors.title = "Please enter title!";
    if(!formValues.description)
        errors.description = "Please enter description!";
    return errors;
};

export default reduxForm(
    {
        form:'streamForm',
        validate:validate
    }  
)(StreamForm);

