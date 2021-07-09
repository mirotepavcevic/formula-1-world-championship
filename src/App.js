import React from "react";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";
import * as $ from "jquery";
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import { PropTypes } from "prop-types";
import Welcome from "./Welcome";
import DriversTable from "./DriversTable";
import Teams from "./Teams";
import Races from "./Races";
import Flag from "react-flagkit";
import DriverDetails from "./DriverDetails";
import TeamsDetails from "./TeamsDetails";
import RacesDetails from "./RacesDetails";

export default class App extends React.Component {

	constructor() {
		super();
		this.state = { value: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) { this.setState({ value: event.target.value }); }
	handleSubmit(event) {
		alert('Your choose is: ' + this.state.value + ' year');
		event.preventDefault();

	}

	render() {
		return (

			<Router>
				<div className="main">
					<div className="sidebar">

						<nav>
							<div>
								<img src="img/praviLogo.jpg" />
							</div>
							<div>
								<ul className="links">
									<li className="link">
										<NavLink
											to={{ pathname: '/drivers', state: { year: this.state.value } }}
											activeClassName="selected"
										>
											<img src="img/helmet.png" />
											<p className="linkPara">Drivers</p>
										</NavLink>
									</li>

									<li className="link">
										<NavLink
											to={{ pathname: '/teams', state: { year: this.state.value } }}
											activeClassName="selected"
										>
											<img src="img/timovi1.png" />
											<p>Teams</p>
										</NavLink>
									</li>
									<li className="link">
										<NavLink
											to={{ pathname: '/races', state: { year: this.state.value } }}
											activeClassName="selected"
										>
											<img src="img/checkered-flag.png" />
											<p>Races</p>
										</NavLink>
									</li>
									<li className="link">
										<NavLink to="/"><img src="img/home.png" /><p>Home</p>
										</NavLink>

										<form onSubmit={this.handleSubmit}>

											<input type="text" value={this.state.value} onChange={this.handleChange} />
											<input type="submit" value="Search" />
										</form>

									</li>
								</ul>
							</div>

						</nav>
					</div>
					<div className="content">
						<Route path="/" exact component={Welcome} />
						<Route path="/drivers" exact component={DriversTable} />
						<Route path="/teams" exact component={Teams} />
						<Route path="/races" exact component={Races} />
						<Route
							path="/drivers/:id"
							exact
							component={DriverDetails}
						/>
						<Route
							path="/teams/:id"
							exact
							component={TeamsDetails}
						/>
						<Route
							path="/races/:id"
							exact
							component={RacesDetails}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
