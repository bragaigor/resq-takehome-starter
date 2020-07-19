import React from 'react';
import logo from './logo.svg';
import './App.css';
import './WorkOrder';
import WorkOrder from './WorkOrder';
import inventoryList from './inventoryTest';
import Modal from './Modal';


class App extends React.Component {

	constructor() {
		super();
		this.state = {
			show: false
		};
	};

	showModal = () => {
		this.setState({ show: true });
	};
	
	hideModal = () => {
		this.setState({ show: false });
	};

	render() {

		const myName = "Igor Braga";

		/* Load from database */

		/* Create dynamic style */
		const styles = {
			color: "black",
			backgroundColor: "#CCCCCC",
			fontSize: 30 // Pixels
		};
		styles["backgroundColor"] = "#DDDD88";

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

		const comp = inventoryList.map(item => {
			const aDict = {};
			aDict.facility = item.facility;
			aDict.description = item.description;
			return <WorkOrder key={item.id} info={aDict}/>;
		});

		/* Create array of divs here */
		var iDiv = document.createElement('div');
		iDiv.className = 'row';
		// iDiv.appendChild(<WorkOrder info={workOrder1}/>);
		// var elel = document.createElement("<WorkOrder info={workOrder1}/>");
		// iDiv.appendChild(elel);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Welcome to <code>ResQ</code> Take-Home Code Challenge. Created by {myName}
					</p>
				</header>

				<Modal show={this.state.show} handleClose={this.hideModal}>
					<p>Modal</p>
					<p>Data</p>
				</Modal>

				<div>
					<p style={styles}>This is a test bar</p>
				</div>
				<div>
					<div>
						<div class="autocomplete">
							<input id="myInput" type="text" className="myCountry" placeholder="Country" />
						</div>
						<input type="button" onClick={this.showModal} value="+" />
					</div>

					<div className="row">
						<WorkOrder info={workOrder1}/>
						<WorkOrder info={workOrder3}/>
						<WorkOrder info={workOrder2}/>
					</div>
					<div className="row">
						<WorkOrder info={workOrder1}/>
					</div>
				</div>
				

			</div>
		);
	}
}

export default App;
