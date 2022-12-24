import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';

const mapStateToProps = (state) => {
	return {
		searchfield: state.searchRobots.searchfield, 
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending, 
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
  
class App extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		robots: []
	// 		// searchfield: ''
	// 	}
	// 	// console.log('constructor');
	// }

	componentDidMount() {
		// // console.log(this.props.store.getState());
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response => response.json())
		// 	.then(users => this.setState({robots: users}))
		// // this.setState({robots: robots});
		// // console.log('didmount');
		this.props.onRequestRobots();
	}

	// onSearchChange = (event) => {
	// 	this.setState({searchfield: event.target.value});
	// 	// const filteredRobots = this.state.robots.filter(robot => {
	// 	// 	return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
	// 	// })
	// 	// console.log(filteredRobots);
	// }
	render () {
		// const {robots, searchfield} = this.state;
		// const { robots } = this.state;
		const { searchfield, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		// if(!robots.length) {
		// 	return <h1>Loading</h1>
		// } else {
		// 	return (
		// 		<div className = 'tc'>
		// 			<h1 className = 'f1'>Robofriends</h1>
		// 			<SearchBox searchChange = {this.onSearchChange}/>
		// 			<Scroll>
		// 				<CardList robots = {filteredRobots}/>
		// 			</Scroll>
		// 		</div>
		// 	);	
		// }
		return isPending ? 
			<h1>Loading</h1> :
			(
				<div className = 'tc'>
					<h1 className = 'f1'>Robofriends</h1>
					<SearchBox searchChange = {onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots = {filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);	
		// console.log('render');
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
