import React from 'react';
import './WorkOrder.css';

class WorkOrder extends React.Component {

    /* Probably don't need it */
    constructor() {
        super();
        // this.state = {
        //     facility: props.info.facility,
        //     description: props.info.description
        // };
    }

    handleClick = () => {
        const data = "This is a string";
        console.log("About to call showEditModal with " + data);
        this.props.onTheClick(this.props.info);
    }

    render() {
        console.log(this.props);
        if (!this.props.info.description) {
            this.props.info.description = "No Description";
        }

        return (
            <div className="card column" onClick={this.handleClick}>
                <p>{this.props.info.facility}</p>
                <p>{this.props.info.description}</p>
            </div>
        );
    }
}

export default WorkOrder;