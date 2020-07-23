import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import WorkOrder from './WorkOrder';
import inventoryList from './inventoryTest';
import Modal from './Modal';
import EditModal from './EditModal';
import Rows from './Rows';
import Autocomplete from './Autocomplete';


class App extends React.Component {

	constructor() {
		super();

		this.state = {
			nextId: 0,
			show: false,
			editShow: false,
			listOfWorkers: [],
			staticListOfWorkers: [],
			data: {},
			state: {
				"OPEN": ["OPEN", "STARTED", "CANCELED"],
				"STARTED": ["STARTED", "OPEN", "COMPLETED"],
				"CANCELED": ["CANCELED"],
				"COMPLETED": ["COMPLETED"]
			}
		};

		/* Do we sactually need this? */
		this.updateListOfWorkers = this.updateListOfWorkers.bind(this);
	};

	componentDidMount() {
		this.updateListOfWorkers("");
	}

	showModal = () => {
		this.setState({ show: true });
	};

	showEditModal = (aDict) => {
		console.log("I was clikced!!!! " + aDict);
		this.setState({ 
			editShow: true ,
			data: aDict
		});
	};
	
	hideModal = () => {
		this.setState({ 
			show: false,
			editShow: false
		
		});
		/* This is where we'll probably add entry to database */
	};

	insertWorkOrder = (newWorkOrder) => {

		console.log("Inside insertWorkOrder and newWorkOrder " + newWorkOrder);
		newWorkOrder["state"] = "OPEN";
		axios.post('http://127.0.0.1:8000/newWork', newWorkOrder);
		newWorkOrder.id = this.state.nextId;
		let currentList = this.state.staticListOfWorkers;
		currentList.push(newWorkOrder);

		this.updateListOfWorkers("");
		let countID = newWorkOrder.id + 1

		this.setState(prevState =>
			{
				return {
					staticListOfWorkers: currentList,
					nextId: countID
				};
			
			});
	}

	editWorkOrder = (existingWorkOrder) => {

		console.log("Inside editWorkOrder and existingWorkOrder " + existingWorkOrder);
		const workOrderID = existingWorkOrder.id;
		let currentList = this.state.staticListOfWorkers;

		for (let i = 0; i < currentList.length; i++) {
			if (workOrderID == currentList[i].id) {
				console.log("YAAAAAAY found item to update at index: " + i + ", with ID: " + workOrderID);
				currentList[i].title = existingWorkOrder.title;
				currentList[i].description = existingWorkOrder.description;
				currentList[i].state = existingWorkOrder.state;
				break;
			}
		}

		this.updateListOfWorkers("");

		this.setState(prevState =>
			{
				return {
					staticListOfWorkers: currentList				
				};
			
			});
	}

	updateListOfWorkers = (workSelected) => {

		const url = 'http://127.0.0.1:8000/facility/' + encodeURIComponent(workSelected);
		axios.get(url).then(response => response.data)
			.then((data) => {
				this.setState({ staticListOfWorkers: data.data })
				console.log(this.state.staticListOfWorkers);
			})
			.then(() => {
				let currentList = this.state.staticListOfWorkers;
				console.log("Word 11 selected was: " + workSelected);
				// console.log("TITLE ::::: " + currentList[0]["title"])

				if (!(workSelected instanceof String) || workSelected.length == 0) {
					workSelected = "";
				}
				console.log("Word selected was: " + workSelected);
				let listOfRows = [];
				let currentRow = [];
				var count = 0;
				var nextID = this.state.nextId;
				for (let i = 0; i < currentList.length; i++) {
					const item = currentList[i];
					if (item.id > nextID) {
						nextID = item.id;
					}
					const title = item.title;
					const facility = item.facility;
					if (title.indexOf(workSelected) != -1 || facility.indexOf(workSelected) != -1) {
						const aDict = {};
						aDict.facility = facility;
						aDict.id = item.id;
						aDict.title = item.title;
						aDict.description = item.description;
						aDict.facility = item.facility;
						aDict.state = item.state;
						aDict.selectOptions = this.state.state[item.state];
						const workOrder = <WorkOrder key={item.id} info={aDict} onTheClick={this.showEditModal}/>;
						currentRow.push(workOrder);
						if (i != 0 && (count % 3 == 0 || i == (currentList.length - 1))) {
							listOfRows.push(new Array(currentRow));
							currentRow = [];
						}
						count++;
					}
				}
				if (currentRow.length != 0) {
					listOfRows.push(new Array(currentRow));
				}

				nextID++;

				this.setState(prevState =>
					{
						return {
							listOfWorkers: listOfRows,
							nextId: nextID		
						};
					
					});
			})
	};

	getTitlesFacilitiesAsList = () => {
		let currentListWorkers = this.state.staticListOfWorkers;
		const listToReturn = [];
		console.log("Complete list: " + currentListWorkers);

		for (let i = 0; i < currentListWorkers.length; i++) {
			console.log("Iter: " + i + " at item: " + currentListWorkers[i]);
			const title = currentListWorkers[i].title;
			const facility = currentListWorkers[i].facility;
			console.log("Appending title: " + title + " and facility: " + facility + " to list.");
			listToReturn.push(title);
			listToReturn.push(facility);
		}

		return listToReturn;
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

		window.onload = this.updateListOfWorkers;

		/* Create array of divs here */
		var iDiv = document.createElement('div');
		iDiv.className = 'row';

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Welcome to <code>ResQ</code> Take-Home Code Challenge. Created by {myName}
					</p>
				</header>

				<Modal show={this.state.show} handleClose={this.hideModal} handleSubmit={this.insertWorkOrder}/>

				<EditModal show={this.state.editShow} handleClose={this.hideModal} handleSubmit={this.editWorkOrder} data={this.state.data}/>
				<div>
					<div>
						<div className="autocomplete">
							<Autocomplete suggestions={this.getTitlesFacilitiesAsList} handleUpdate={this.updateListOfWorkers}/>
						</div>
						<input type="button" onClick={this.showModal} value="+" />
					</div>
					{this.state.listOfWorkers}
				</div>
				
			</div>
		);
	}
}

export default App;
