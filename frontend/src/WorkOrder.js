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

    render() {
        console.log(this.props);
        if (!this.props.info.description) {
            this.props.info.description = "No Description";
        }

        return (
            <div className="card column">
                <p>{this.props.info.facility}</p>
                <p>{this.props.info.description}</p>
            </div>
        );
    }
}

export default WorkOrder;