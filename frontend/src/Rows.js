import React from 'react';
// import './Rows.css';
import WorkOrder from './WorkOrder';

class Rows extends React.Component {

    /* Probably don't need it */
    constructor() {
        super();
        // this.state = {
        //     facility: props.info.facility,
        //     description: props.info.description
        // };
    }

    render() {
        // console.log(this.props);
        // if (!this.props.info.description) {
        //     this.props.info.description = "No Description";
        // }

        const workOrder1 = {
			facility: "Title Facility 1",
			description: "Some description here"
		};

		const workOrder2 = {
			facility: "Title Facility 2",
			description: "Some OTHER description here"
        };
        
        const workOrder3 = {
			facility: "Title Facility 2"};

        const listOfWorkOrders = [<WorkOrder info={workOrder1} />, <WorkOrder info={workOrder3} />, <WorkOrder info={workOrder2} />];

        return (
            <div className="row">
                {listOfWorkOrders}
            </div>
        );
    }
}

export default Rows;