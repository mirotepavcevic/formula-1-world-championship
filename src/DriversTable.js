import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";


export default class DriversTable extends React.Component {
	constructor() {
		super();

		this.state = {
			drivers: [],
			flags: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getDriver()
	}

	getDriver(){
		var urlResponse = $.ajax(`http://ergast.com/api/f1/2013/driverStandings.json`);
		var urlFlags = $.ajax(`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`);

		$.when(urlResponse, urlFlags).done(function(data1, data2) {
			this.setState({
				drivers: data1[0].MRData.StandingsTable.StandingsLists[0]
				.DriverStandings,
				flags: JSON.parse(data2[0]),
				isLoading: false
			})
		}.bind(this))
	}

	

	render() {
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
								Drivers Championships Standings - 2013
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
									<td className="fullName">
										{this.state.flags.map((flag, i) => {
											if (
												driver.Driver.nationality ===
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
												driver.Driver.nationality ===
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
											to={`/driverDetails/${driver.Driver.driverId}`}
										>
											{driver.Driver.givenName +
												" " +
												driver.Driver.familyName}
										</Link>
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
