import React from 'react';
import './Modal.css';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idValue: -1,
            titleValue: '',
            descriptionValue: '',
            facilityValue: ''
    
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleTitleChange = (event) => {
        this.setState({titleValue: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({descriptionValue: event.target.value});
    }

    handleFacilityChange = (event) => {
        this.setState({facilityValue: event.target.value});
    }

    /* TODO: Clear text input after closing and/or submitting */
    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.titleValue + ", description: " + this.state.descriptionValue + ", facility: " + this.state.facilityValue);
        event.preventDefault();
        let workOrder = {
            title: this.state.titleValue,
            description: this.state.descriptionValue,
            facility: this.state.facilityValue
        };
        console.log("About to call insertWorkOrder: " + workOrder);
        this.props.handleSubmit(workOrder);
        this.props.handleClose();
      }

    render = () => {

        const show = this.props.show;
        const handleClose = this.props.handleClose;

        const showHideClassName = show ? "modal display-block" : "modal display-none";
      
        return (
          <div className={showHideClassName}>
            <section className="modal-main">
            <p>Insert new work order here</p>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                <input className="formInput" type="text" value={this.state.titleValue} onChange={this.handleTitleChange} /> </label>
                <br></br>
                <label>
                    Description:
                <input className="formInput" type="text" value={this.state.descriptionValue} onChange={this.handleDescriptionChange} /> </label>
                <br></br>
                <label>
                    Facility:
                <input className="formInput" type="text" value={this.state.facilityValue} onChange={this.handleFacilityChange} /> </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
              <div className="closeButtonHover"><input className="closeButton" type="button" onClick={handleClose} value="Close"/></div>
            </section>
          </div>
        );
    }
}


export default Modal;