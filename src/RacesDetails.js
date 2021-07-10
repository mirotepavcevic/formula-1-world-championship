import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class RacesDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			qngResults: [],
			raceResults: [],
			flags: [],
			year: "",
			raceCard: [],
			colors: [
				"yellow",
				"lightgray",
				"orange",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
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
			isLoading: true,
		};
	}
	componentDidMount() {
		this.getResults(this.props.match.params.id, this.props.location.state.year);
	}
	getResults(id, year) {
		var urlQngResults = $.ajax(
			`http://ergast.com/api/f1/${year}/${id}/qualifying.json`
		);
		var urlRaceResults = $.ajax(
			`http://ergast.com/api/f1/${year}/${id}/results.json`
		);
		var urlFlags = $.ajax(
			`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
		);

		$.when(urlQngResults, urlRaceResults, urlFlags).done(
			function (data1, data2, data3) {
				this.setState({
					qngResults:
						data1[0].MRData.RaceTable.Races[0].QualifyingResults,
					raceResults: data2[0].MRData.RaceTable.Races[0].Results,
					flags: JSON.parse(data3[0]),
					raceCard: data1[0].MRData.RaceTable.Races,
					isLoading: false,
				});
			}.bind(this)
		);
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
		console.log(this.state.flags)
		return (
			<div className="racesDetails">
				<div className="raceCard">
					{this.state.raceCard.map((card, i) => {
						return (
							<div key={i}>
								<div>
									{this.state.flags.map((flag, i) => {
										if (
											card.Circuit.Location.country ===
											"UK" &&
											flag.en_short_name ===
											"United Kingdom of Great Britain and Northern Ireland"
										) {
											return (
												<Flag
													key={i}
													country="GB"
													size={200}
												/>
											);
										} else if (
											card.Circuit.Location.country ===
											"Korea" &&
											flag.en_short_name ===
											"Korea (Republic of)"
										) {
											return (
												<Flag
													key={i}
													country="KR"
													size={200}
												/>
											);
										} else if (
											card.Circuit.Location.country ===
											"UAE" &&
											flag.en_short_name ===
											"United Arab Emirates"
										) {
											return (
												<Flag
													key={i}
													country="AE"
													size={200}
												/>
											);
										} else if (
											card.Circuit.Location.country ===
											"Russia" &&
											flag.en_short_name ===
											"Russian Federation"
										) {
											return (
												<Flag
													key={i}
													country="RU"
													size={200}
												/>
											);

										} else if (
											card.Circuit.Location.country ===
											"USA" &&
											flag.en_short_name ===
											"United States of America"
										) {
											return (
												<Flag
													key={i}
													country="US"
													size={200}
												/>
											);
										} else {
											if (
												card.Circuit.Location
													.country ===
												flag.en_short_name
											) {
												return (
													<Flag
														key={i}
														country={
															flag.alpha_2_code
														}
														size={200}
													/>
												);
											}
										}
									})}
								</div>
								<div className="raceCardHeading">
									{card.raceName}
									{console.log(card.Circuit.Location
										.country)}
								</div>
								<table className="raceCardTable">
									<tbody>
										<tr>
											<td>Country:</td>
											<td>{card.Circuit.Location.country}</td>
										</tr>
										<tr>
											<td>Location:</td>
											<td>
												{card.Circuit.Location.locality}
											</td>
										</tr>
										<tr>
											<td>Date:</td>
											<td>{card.date}</td>
										</tr>
										<tr>
											<td>Full report:</td>
											<td>
												<Link
													to={`///en.wikipedia.org/wiki/2013${card.raceName}`}
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
				<div className="raceDetailsTable">
					{/* Qnd table */}

					<table>
						<thead>
							<tr>
								<th colSpan="4">Qualifying Results</th>
							</tr>
							<tr>
								<th>Pos</th>
								<th>Driver</th>
								<th>Team</th>
								<th>Best Time</th>
							</tr>
						</thead>
						<tbody>
							{this.state.qngResults.map((res, i) => {
								var niz = [];
								niz.push(res.Q1);
								niz.push(res.Q2);
								niz.push(res.Q3);
								var niz1 = niz.sort();

								return (
									<tr key={i}>
										<td className="blackColor">
											{res.position}
										</td>
										<td>
											<div className="constructorRaces">
												{this.state.flags.map(
													(flag, i) => {
														if (
															res.Driver
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
															res.Driver
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
														} else if (
															res.Driver
																.nationality ===
															"Monegasque" &&
															flag.nationality ===
															"Monégasque, Monacan"
														) {
															return (
																<Flag
																	key={i}
																	country="MC"
																/>
															);
														} else {
															if (
																res.Driver
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
													}
												)}
												<p>
													<Link
														to={{ pathname: `/drivers/${res.Driver.driverId}`, state: { year: this.props.location.state.year } }}
													>
														{res.Driver.familyName}
													</Link>
												</p>
											</div>
										</td>
										<td>
											<Link
												to={{ pathname: `/teams/${res.Constructor.constructorId}`, state: { year: this.props.location.state.year } }}
											>
												{res.Constructor.name}
											</Link>
										</td>
										<td className="blackColor">
											{niz1[0]}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<table>
						<thead>
							<tr>
								<th colSpan="5">Race results</th>
							</tr>
							<tr>
								<th>Pos</th>
								<th>Driver</th>
								<th>Team</th>
								<th>Results</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{this.state.raceResults.map((rec, i) => {
								return (
									<tr key={i}>
										<td className="blackColor">
											{rec.position}
										</td>
										<td>
											<div className="constructorRaces">
												{this.state.flags.map(
													(flag, i) => {
														if (
															rec.Driver
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
															rec.Driver
																.nationality ===
															"Monegasque" &&
															flag.nationality ===
															"Monégasque, Monacan"
														) {
															return (
																<Flag
																	key={i}
																	country="MC"
																/>
															);
														} else if (
															rec.Driver
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
																rec.Driver
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
													}
												)}
												<p>
													<Link
														to={{ pathname: `/drivers/${rec.Driver.driverId}`, state: { year: this.props.location.state.year } }}
													>
														{rec.Driver.familyName}
													</Link>
												</p>
											</div>
										</td>
										<td>
											<Link
												to={{ pathname: `/teams/${rec.Constructor.constructorId}`, state: { year: this.props.location.state.year } }}
											>
												{rec.Constructor.name}
											</Link>
										</td>
										<td className="blackColor">
											{rec.Time !== undefined
												? rec.Time.time
												: "not finished"}
										</td>
										<td
											className="blackColor"
											style={{
												backgroundColor:
													this.state.colors[
													parseInt(rec.position) -
													1
													],
											}}
										>
											{rec.points}
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
