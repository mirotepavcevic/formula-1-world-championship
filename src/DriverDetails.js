import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";
import Races from "./Races";
import { MetroSpinner } from "react-spinners-kit";

export default class DriverDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			drivers: [],
			flags: [],
			races: [],
			year: "",
			colors: [
				"yellow",
				"gray",
				"orange",
				"lightgreen",
				"lightblue",
				"greenyellow",
				"cadetblue",
				"wheat",
				"aquamarine",
				"coral",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
			],
			isLoading: true
		};
	}
	componentDidMount() {
		this.getDrivers(this.props.match.params.id, this.props.location.state.year);
		console.log('vrednost: ', this.props.location.state.year)
		// this.getDrivers();
		// this.getFlags();
		// this.getRaces();
	}

	getDrivers(id, year) {
		var urlDrivers = $.ajax(
			`http://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`
		);
		var urlFlags = $.ajax(
			`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
		);
		var urlRaces = $.ajax(
			`http://ergast.com/api/f1/${year}/drivers/${id}/results.json`
		);

		$.when(urlDrivers, urlFlags, urlRaces).done(
			function (data1, data2, data3) {
				this.setState({
					drivers:
						data1[0].MRData.StandingsTable.StandingsLists[0]
							.DriverStandings,
					flags: JSON.parse(data2[0]),
					races: data3[0].MRData.RaceTable.Races,
					isLoading: false
				});
			}.bind(this)
		);
	}

	// getDrivers() {
	// 	const id = this.props.match.params.id;
	// 	console.log(id);
	// 	var url =
	// 		"http://ergast.com/api/f1/2013/drivers/" +
	// 		id +
	// 		"/driverStandings.json";
	// 	$.get(url, (data) => {
	// 		console.log(data);
	// 		this.setState({
	// 			drivers:
	// 				data.MRData.StandingsTable.StandingsLists[0]
	// 					.DriverStandings,
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
	// 		});
	// 	});
	// }

	// getRaces() {
	// 	const id = this.props.match.params.id;
	// 	var url =
	// 		"http://ergast.com/api/f1/2013/drivers/" + id + "/results.json";
	// 	$.get(url, (data) => {
	// 		console.log(data);
	// 		this.setState({
	// 			races: data.MRData.RaceTable.Races,
	// 		});
	// 	});
	// }

	render() {
		const { loading } = this.state;
		if (this.state.isLoading) {
			return (
				<div className="races">
					<h2>Race Calendar</h2>
					<div className="spinner">
						<MetroSpinner
							size={200}
							color="#fff"
							loading={loading}
						/>
					</div>
					;
				</div>
			);
		}
		// console.log(this.state.drivers);
		// console.log(this.state.races);
		// console.log('props', this.props)
		return (
			<div className="driverDetails">
				<div className="driverCard">
					{this.state.drivers.map((driver, i) => {
						return (
							<div key={i}>
								<div className="driverHeading">
									<div className="driverPhoto">
										<img
											src={
												"../img/drivers_new/" +
												driver.Driver.givenName +
												"_" +
												driver.Driver.familyName +
												".png"

											} alt=""
										/>

									</div>
									<div className="driverNameContent">
										<div>
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
															size={60}
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
															size={60}
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
																size={60}
															/>
														);
													}
												}
											})}
										</div>
										<div className="driverName">
											<div>{driver.Driver.givenName}</div>
											<div>
												{driver.Driver.familyName}
											</div>
										</div>
									</div>
								</div>

								<table className="driverCardTable">
									<tbody>
										<tr>
											<th>Country:</th>
											<td>{driver.Driver.nationality}</td>
										</tr>
										<tr>
											<th>Team:</th>
											<td>{driver.Constructors[0].name}</td>
										</tr>
										<tr>
											<th>Birth:</th>
											<td>{driver.Driver.dateOfBirth}</td>
										</tr>
										<tr>
											<th>Biography:</th>
											<td>
												<Link
													to={
														"///en.wikipedia.org/wiki/" +
														driver.Driver.givenName +
														"_" +
														driver.Driver.familyName
													}
													target={"_blank"}
												>
													<i className="fa fa-external-link"></i>
												</Link>
											</td>
										</tr>
									</tbody>

								</table>
							</div>
						);
					})}
				</div>
				<div className="driverDetailsTable">
					<table>
						<thead>
							<tr>
								<th colSpan="5">Formula 1 {this.props.location.state.year} Results</th>
							</tr>
							<tr>
								<th>Round</th>
								<th>Grand Prix</th>
								<th>Team</th>
								<th>Grid</th>
								<th>Race</th>
							</tr>
						</thead>
						<tbody>
							{this.state.races.map((race, i) => {
								return (
									<tr key={i}>
										<td className="position">
											{race.round}
										</td>
										<td>
											<div className="constructorRaces">
												<Link
													to={{ pathname: `/races/${race.round}`, state: { year: this.props.location.state.year } }}>
													{/* to={`/races/${race.round}`} */}
													{this.state.flags.map(
														(flag, i) => {
															if (
																race.Circuit
																	.Location
																	.country ===
																"UK" &&
																flag.en_short_name ===
																"United Kingdom of Great Britain and Northern Ireland"
															) {
																return (
																	<Flag
																		key={i}
																		country="GB"
																		size={
																			30
																		}
																	/>
																);
															} else if (
																race.Circuit.Location.country ===
																"Russia" &&
																flag.en_short_name ===
																"Russian Federation"
															) {
																return (
																	<Flag
																		key={i}
																		country="RU"
																		size={
																			30
																		}
																	/>
																);

															} else if (
																race.Circuit
																	.Location
																	.country ===
																"Korea" &&
																flag.en_short_name ===
																"Korea (Republic of)"
															) {
																return (
																	<Flag
																		key={i}
																		country="KR"
																	/>
																);
															} else if (
																race.Circuit
																	.Location
																	.country ===
																"UAE" &&
																flag.en_short_name ===
																"United Arab Emirates"
															) {
																return (
																	<Flag
																		key={i}
																		country="AE"
																	/>
																);
															} else if (
																race.Circuit
																	.Location
																	.country ===
																"USA" &&
																flag.en_short_name ===
																"United States of America"
															) {
																return (
																	<Flag
																		key={i}
																		country="US"
																	/>
																);
															} else {
																if (
																	race.Circuit
																		.Location
																		.country ===
																	flag.en_short_name
																) {
																	return (
																		<Flag
																			key={
																				i
																			}
																			country={
																				flag.alpha_2_code
																			}
																			size={
																				30
																			}
																		/>
																	);
																}
															}
														}
													)}
													<p>{race.raceName}</p>
												</Link>
											</div>
										</td>
										<td className="driversTeam">
											<Link
												to={{ pathname: `/teams/${race.Results[0].Constructor.constructorId}`, state: { year: this.props.location.state.year } }}
											>
												{race.Results[0].Constructor.name}
											</Link>

										</td>
										<td className="driversGrid">
											{race.Results[0].grid}
										</td>

										<td
											className="driversRace"
											style={{
												backgroundColor:
													this.state.colors[
													parseInt(
														race.Results[0]
															.position
													) - 1
													],
											}}
										>
											{race.Results[0].position}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
