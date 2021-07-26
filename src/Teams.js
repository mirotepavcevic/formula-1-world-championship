import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { MetroSpinner } from "react-spinners-kit";

export default class Teams extends React.Component {
	constructor() {
		super();

		this.state = {
			teams: [],
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
		var url = `http://ergast.com/api/f1/${year}/constructorStandings.json`;
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				teams: data.MRData.StandingsTable.StandingsLists[0]
					.ConstructorStandings,
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
				<div className="teams">
					<h2>You have to choose the year...</h2>
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
		return (
			<div className="teams">
				<h2>Constructors Championship</h2>
				<table>
					<thead>
						<tr>
							<th colSpan="4">
								Constructors Championships Standings - {this.props.location.state.year}
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.teams.map((team, i) => {
							return (
								<tr key={i}>
									<td className="position">
										{team.position}
									</td>
									<td>
										<div className="constructorTeams">
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
															size={30}
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
																size={30}
															/>
														);
													}
												}
											})}
											<p>
											<Link
												to={
													"///en.wikipedia.org/wiki/" +
													team.Constructor.name
												}
												target={"_blank"}
											>
												{team.Constructor.name}
											</Link>
												</p>
										</div>
									</td>
									<td>
										<Link
											to={{pathname:`teams/${team.Constructor.constructorId}`, state:{year:this.props.location.state.year}}}
											// to={`teams/${team.Constructor.constructorId}`}
										>
											Details{" "}
											<i className="fa fa-external-link"></i>
										</Link>
									</td>
									<td className="points">{team.points}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
