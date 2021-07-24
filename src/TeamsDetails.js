import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";
import Races from "./Races";
import { MetroSpinner } from "react-spinners-kit";

export default class TeamsDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			teams: [],
			flags: [],
			year: "",
			teamResults: [],
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
		this.getTeamDetails(this.props.match.params.id, this.props.location.state.year);
	}

	getTeamDetails(id, year) {
		var urlTeams = $.ajax(
			`http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`
		);
		var urlFlags = $.ajax(
			`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
		);
		var urlTeamResults = $.ajax(
			`http://ergast.com/api/f1/${year}/constructors/${id}/results.json `
		);

		$.when(urlTeams, urlFlags, urlTeamResults).done(
			function (data1, data2, data3) {
				this.setState({
					teams: data1[0].MRData.StandingsTable.StandingsLists[0]
						.ConstructorStandings,
					flags: JSON.parse(data2[0]),
					teamResults: data3[0].MRData.RaceTable.Races,
					isLoading: false
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
		console.log(this.state.teams);

		return (
			<div className="teamDetails">
				<div className="teamCard">
					{this.state.teams.map((team, i) => {
						return (
							<div>
								<div className="teamHeading">
									<div className="teamPhoto">
										<img
											src={
												"../img/teams_crests/" +
												team.Constructor.name +
												".jpg"
											} alt=""
										/>
									</div>
									<div className="teamNameContent">
										<div>
											{this.state.flags.map((flag, i) => {
												if (
													team.Constructor
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
													team.Constructor
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
														team.Constructor
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
										<div className="teamName">
											<div>{team.Constructor.name}</div>
										</div>
									</div>
								</div>

								<table className="teamCardTable">
									<tbody>
										<tr key={i}>
											<th>Country:</th>
											<td>{team.Constructor.nationality}</td>
										</tr>
										<tr>
											<th>Position:</th>
											<td>{team.position}</td>
										</tr>
										<tr>
											<th>Points:</th>
											<td>{team.points}</td>
										</tr>
										<tr>
											<th>History:</th>
											<td>
												<Link
													to={
														"///en.wikipedia.org/wiki/" +
														team.Constructor.name
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
				<div className="teamDetailsTable">
					<table>
						<thead>
							<tr>
								<th colSpan="5">Formula 1 {this.props.location.state.year} Results</th>
							</tr>
							{this.state.teamResults.map((race, i) => {
								if (i < 1) {
									return (
										<tr key={i}>
											<th>Round</th>
											<th>Grand Prix</th>
											<th>
												<Link
													to={{ pathname: `/drivers/${race.Results[0].Driver.driverId}`, state: { year: this.props.location.state.year } }}
												>
													{
														race.Results[0].Driver
															.familyName
													}
												</Link>

											</th>
											<th>
												<Link
													to={{ pathname: `/drivers/${race.Results[1].Driver.driverId}`, state: { year: this.props.location.state.year } }}
												>
													{
														race.Results[1].Driver
															.familyName
													}
												</Link>
											</th>
											<th>Points</th>
										</tr>
									);
								}
							})}
						</thead>
						<tbody>
							{this.state.teamResults.map((race, i) => {
								return (
									<tr key={i}>
										<td className="colorBlack">
											{race.round}
										</td>
										<td>
											<div className="constructorTeams">
												<Link
													to={{ pathname: `/races/${race.round}`, state: { year: this.props.location.state.year } }}>
													{/* to={`/races/${race.round}`}> */}
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
																"American" &&
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
																			size={30}
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
										<td
											className="colorBlack"
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
										<td
											className="colorBlack"
											style={{
												backgroundColor:
													this.state.colors[
													parseInt(
														race.Results[1]
															.position
													) - 1
													],
											}}
										>
											{race.Results[1].position}
										</td>

										<td className="colorBlack">
											{parseInt(race.Results[0].points) +
												parseInt(
													race.Results[1].points
												)}
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
