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
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getRaces()
	}

	getRaces(){
		var urlRaces = $.ajax(`http://ergast.com/api/f1/2013/results/1.json`);
		var urlFlags = $.ajax(`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`);

		$.when(urlRaces, urlFlags).done(function(data1, data2) {
			this.setState({
				races: data1[0].MRData.RaceTable.Races,
				flags: JSON.parse(data2[0]),
				isLoading: false
			})
		}.bind(this))
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
							<th colSpan="5">Race Calendar - 2013</th>
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
									<td className="constructorRaces">
										<Link to={`/grandPrixTable/${race.round}`}>
											{this.state.flags.map((flag, i) => {
												if (
													race.Circuit.Location
														.country === "UK" &&
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
													race.Circuit.Location
														.country === "Korea" &&
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
													race.Circuit.Location
														.country === "UAE" &&
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
													race.Circuit.Location
														.country === "USA" &&
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
														race.Circuit.Location
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
											})}
											<p>{race.raceName}</p>
										</Link>
									</td>
									<td className="circuit">
										{race.Circuit.circuitName}
									</td>
									<td className="date">{race.date}</td>
									<td className="winner">
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
											{race.Results[0].Driver.familyName}
										</p>
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
