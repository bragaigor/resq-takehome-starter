import React from 'react';
import './Modal.css';

class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idValue: -1,
            titleValue: '',
            descriptionValue: '',
            facilityValue: '',
            stateValue: '',
            showSelect: false,
            optionList: [],
            currentSelected: ''
    
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
        let curSelected = this.state.currentSelected;
        if(!curSelected) {
            curSelected = this.state.stateValue;
        }
        let workOrder = {
            id: this.state.idValue,
            title: this.state.titleValue,
            description: this.state.descriptionValue,
            facility: this.state.facilityValue,
            state: curSelected
        };
        console.log("About to call insertWorkOrder: " + workOrder);
        this.props.handleSubmit(workOrder);
        this.props.handleClose();
      }

    loadValues = () => {
        if (this.props) {
            this.setState({
                titleValue: this.props.data.title,
                descriptionValue: this.props.data.description,
                facilityValue: this.props.data.facility
            });
     }
    }

    handleSelectChange = (e) => {
        let {name, value} = e.target;
        this.setState({
            currentSelected: value,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data.selectOptions);
        let curOptionList = [];
        if (nextProps.data.selectOptions) {
            for (let i = 0; i < nextProps.data.selectOptions.length; i++) {
                const element = nextProps.data.selectOptions[i];
                let option;
                option = <option key={i} value={element}>{element}</option>;
                curOptionList.push(option);
            }
        }

        this.setState({
            idValue: nextProps.data.id,
            titleValue: nextProps.data.title,
            descriptionValue: nextProps.data.description,
            facilityValue: nextProps.data.facility,
            stateValue: nextProps.data.state,
            optionList: curOptionList
        });
    }

    render = () => {

        console.log("Rendering EditModal title: " + this.props.data.title + ", facility: " + this.props.data.facility);

        const show = this.props.show;
        const handleClose = this.props.handleClose;

        const showHideClassName = show ? "modal display-block" : "modal display-none";
        const title = this.props.data.title;

        // window.onload = this.loadValues;
      
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
                <input className="formInput" type="text" value={this.state.facilityValue} onChange={this.handleFacilityChange} disabled/> </label>
                <br></br>
                <label>
                    Current state:
                <input className="formInput" type="text" value={this.state.stateValue} disabled/> </label>
                <br></br>
                <div className="select-css">
                <label>
                    Modify State:
                    <select className="theSelect" onChange={this.handleSelectChange}>
                        {this.state.optionList}
                    </select>
                    </label>
                </div>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
              <div className="closeButtonHover"><input className="closeButton" type="button" onClick={handleClose} value="Close"/></div>
            </section>
          </div>
        );
    }
}


export default EditModal;