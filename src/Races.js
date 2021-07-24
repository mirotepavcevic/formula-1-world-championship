import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class Races extends React.Component {
	constructor() {
		super();

		this.state = {
			races: [],
			flags: [],
			year: "",
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getResponse(this.props.location.state.year);
		this.getFlags();
	}

	getResponse(year) {
		var url = `http://ergast.com/api/f1/${year}/results/1.json`;
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				races: data.MRData.RaceTable.Races,
				isLoading: false,
			});
		});
	}

	getFlags() {
		var url =
			"https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

		$.get(url, (data) => {
			var flags = JSON.parse(data);
			this.setState({
				flags: flags,
				// isLoading: false,
			});
		});
	}

	render() {
		const { loading } = this.state;
		if (this.state.isLoading) {
			return (
				<div className="races">
					<h2>Race Calendar</h2>
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
			<div className="races">
				<h2>Race Calendar</h2>
				<table>
					<thead>
						<tr>
							<th colSpan="5">Race Calendar - {this.props.location.state.year}</th>
						</tr>
						<tr className="racesRows">
							<th className="racesRow">Round</th>
							<th className="racesRow">Grand Prix</th>
							<th className="racesRow">Circuit</th>
							<th className="racesRow">Date</th>
							<th className="racesRow">Winner</th>
						</tr>
					</thead>
					<tbody>
						{this.state.races.map((race, i) => {
							return (
								<tr key={i}>
									<td className="position">{race.round}</td>
									<td>
										<div className="constructorRaces">
											<Link
												to={{ pathname: `/races/${race.round}`, state: { year: this.props.location.state.year } }}>
												{/* // to={`/races/${race.round}`} */}
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
																	size={30}
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
														}else if (
															race.Circuit.Location.country  ===
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
																	size={30}
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
																		key={i}
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
									<td className="circuit">
										{race.Circuit.circuitName}
									</td>
									<td className="date">{race.date}</td>
									<td>
										<div className="winner">
											{this.state.flags.map((flag, i) => {
												if (
													race.Results[0].Driver
														.nationality ===
													"British" &&
													flag.nationality ===
													"British, UK"
												) {
													return (
														<Flag
															key={i}
															country="GB"
															size={30}
														/>
													);
												} else if (
													race.Results[0].Driver
														.nationality  ===
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
														race.Results[0].Driver
															.nationality ===
														flag.nationality
													) {
														return (
															<Flag
																key={i}
																country={
																	flag.alpha_2_code
																}
																size={30}
															/>
														);
													}
												}
											})}
											<p>
												<Link
													to={{ pathname: `/drivers/${race.Results[0].Driver.driverId}`, state: { year: this.props.location.state.year } }}
												>{
														race.Results[0].Driver
															.familyName
													}</Link>

											</p>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
