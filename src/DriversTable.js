import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";
import { getDerivedStateFromError } from "react-addons-css-transition-group";

export default class DriversTable extends React.Component {
	constructor() {
		super();

		this.state = {
			drivers: [],
			flags: [],
			year: "",
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getDriver(this.props.location.state.year);
		// this.getResponse();
		// this.getFlags();
	}

	getDriver(year) {
		var urlResponse = $.ajax(
			`http://ergast.com/api/f1/${year}/driverStandings.json`
		);
		var urlFlags = $.ajax(
			`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
		);

		$.when(urlResponse, urlFlags).done(
			function (data1, data2) {
				this.setState({
					drivers:
						data1[0].MRData.StandingsTable.StandingsLists[0]
							.DriverStandings,
					flags: JSON.parse(data2[0]),
					isLoading: false,
				});
			}.bind(this)
		);
	}

	// getResponse() {
	// 	var url = "http://ergast.com/api/f1/2013/driverStandings.json";
	// 	$.get(url, (data) => {
	// 		console.log(data);
	// 		this.setState({
	// 			drivers:
	// 				data.MRData.StandingsTable.StandingsLists[0]
	// 					.DriverStandings,
	// 			isLoading: false,
	// 		});
	// 	});
	// }
	// getFlags() {
	// 	var url =
	// 		"https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

	// 	$.get(url, (data) => {
	// 		var flags = JSON.parse(data);
	// 		this.setState({
	// 			flags: flags,
	// 			// isLoading: false,
	// 		});
	// 	});
	// }

	render() {
		console.log(this.state.flags);
		const { loading } = this.state;
		if (this.state.isLoading) {
			return (
				<div className="drivers">
					<h2>Drivers Championship</h2>
					<div className="spinner">
						<FlagSpinner
							size={200}
							color="#000"
							loading={loading}
						/>
					</div>
					;
				</div>
			);
		}
		return (
			<div className="drivers">
				<h2>Drivers Championship</h2>
				<table>
					<thead>
						<tr>
							<th colSpan="5">
								Drivers Championships Standings - {this.props.location.state.year}
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.drivers.map((driver, i) => {
							return (
								<tr key={i}>
									<td className="driverPosition">
										{driver.position}
									</td>
									<td>
										<div className="fullName">
											{this.state.flags.map((flag, i) => {
												if (
													driver.Driver
														.nationality ===
														"British" &&
													flag.nationality ===
														"British, UK"
												) {
													return (
														<Flag
															key={i}
															country="GB"
														/>
													);
												} else if (
													driver.Driver
														.nationality ===
														"Dutch" &&
													flag.nationality ===
														"Dutch, Netherlandic"
												) {
													return (
														<Flag
															key={i}
															country="NL"
														/>
													);
												} else {
													if (
														driver.Driver
															.nationality ===
														flag.nationality
													) {
														return (
															<Flag
																key={i}
																country={
																	flag.alpha_2_code
																}
															/>
														);
													}
												}
											})}

											<Link
											to={{pathname:`/drivers/${driver.Driver.driverId}`, state:{year:this.props.location.state.year}}}
												// to={`/drivers/${driver.Driver.driverId}`}
											>
												{driver.Driver.givenName +
													" " +
													driver.Driver.familyName}
											</Link>
										</div>
									</td>
									<td className="constructor">
										{driver.Constructors[0].name}
									</td>
									<td className="points">{driver.points}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
