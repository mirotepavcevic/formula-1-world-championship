import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";



export default class TeamsDetails extends React.Component {

    constructor() {
        super();

        this.state = {
            flags: [],
            qualifyingResults: [],
            qualifyingResultsCard: [],
            raceResults: [],
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
            isLoading: true,

        }
    }

    componentDidMount() {
        this.getCircuitDetails(this.props.match.params.id)
    }

    getCircuitDetails(id) {
        var urlFlags = $.ajax(`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`);
        var urlQualifyingResults = $.ajax(`http://ergast.com/api/f1/2013/${id}/qualifying.json`)
        var urlQualifyingResultsCard = $.ajax(`http://ergast.com/api/f1/2013/${id}/qualifying.json`)
        var urlRaceResults = $.ajax(`http://ergast.com/api/f1/2013/${id}/results.json`)


        $.when(urlQualifyingResults, urlFlags, urlRaceResults, urlQualifyingResultsCard).done(function (data1, data2, data3, data4) {
            this.setState({
                qualifyingResults: data1[0].MRData.RaceTable.Races[0].QualifyingResults,
                raceResults: data3[0].MRData.RaceTable.Races[0].Results,
                flags: JSON.parse(data2[0]),
                qualifyingResultsCard: data4[0].MRData.RaceTable.Races,
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
            <div>
                <div className="driverDetails">
                    <div className="driverCard">
                        {this.state.qualifyingResultsCard.map((raceCard, i) => {
                            return (
                                <div>
                                    <div className="driverHeading">
                                        <div className="driverPhoto">
                                            {this.state.flags.map((flag, i) => {
                                                if (
                                                    raceCard.Circuit.Location.country ===
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
                                                    raceCard.Circuit.country ===
                                                    "Dutch" &&
                                                    flag.en_short_name ===
                                                    "Dutch, Netherlandic"
                                                ) {
                                                    return (
                                                        <Flag
                                                            key={i}
                                                            country="NL"
                                                            size={200}
                                                        />
                                                    );
                                                } else {
                                                    if (
                                                        raceCard.Circuit.Location.country ===
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
                                        <div className="driverNameContent" >

                                            <div >

                                                <Link className="driverName" style={{ fontSize: "1.25rem", textDecoration: "none" }}
                                                    to={
                                                        `///en.wikipedia.org/wiki/${raceCard.Circuit.Location.locality}_Grand_Prix_Circuit`}
                                                    target={"_blank"}
                                                >{raceCard.raceName}</Link>

                                            </div>
                                        </div>
                                    </div>

                                    <table className="driverCardTable" style={{ fontSize: "0.9rem" }}>
                                        <tr>
                                            <th>Country:</th>
                                            <td>{raceCard.Circuit.Location.country}</td>
                                        </tr>
                                        <tr>
                                            <th>Location:</th>
                                            <td>{raceCard.Circuit.Location.locality}</td>
                                        </tr>
                                        <tr>
                                            <th>Date:</th>
                                            <td>{raceCard.date}</td>
                                        </tr>
                                        <tr>
                                            <th>Full Report:</th>
                                            <td>
                                                <Link
                                                    to={
                                                        `///en.wikipedia.org/wiki/2013${raceCard.raceName}`}
                                                    target={"_blank"}
                                                >
                                                    <i class="fa fa-external-link"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                            )
                        })}
                    </div>

                    <div className="driverDetailsTable" style={{ justifyContent: "space-evenly", width: "78%" }}>

                        <div style={{ width: "inherit" }}>
                            <table>

                                <thead>
                                    <tr>
                                        <th colSpan="5">Qualifying Results </th>
                                    </tr>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Driver</th>
                                        <th>Team</th>
                                        <th>BestTime</th>

                                    </tr>

                                </thead>
                                <tbody >
                                    {this.state.qualifyingResults.map((driver, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="position">
                                                    {driver.position}
                                                </td>
                                                <td className="fullName">

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
                                                    <Link
                                                        to={`/driverDetails/${driver.Driver.driverId}`}
                                                    >{driver.Driver.familyName}</Link>
                                                </td>
                                                <td className="driversTeam">
                                                    <Link to={`/teamsDetails/${driver.Constructor.constructorId}`}>{driver.Constructor.name}</Link>
                                                </td>
                                                <td className="driversGrid">
                                                    {driver.Q3}
                                                </td>


                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>


                        <div style={{ width: "inherit" }}>
                            <table >

                                <thead>
                                    <tr>
                                        <th colSpan="5">Race Results </th>
                                    </tr>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Driver</th>
                                        <th>Team</th>
                                        <th>Result</th>
                                        <th>Points</th>

                                    </tr>

                                </thead>
                                <tbody>
                                    {this.state.raceResults.map((raceResult, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="driverPosition">
                                                    {raceResult.position}
                                                </td>
                                                <td className="fullName">

                                                    {this.state.flags.map((flag, i) => {
                                                        if (
                                                            raceResult.Driver
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
                                                            raceResult.Driver
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
                                                                raceResult.Driver
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
                                                    <Link
                                                        to={`/driverDetails/${raceResult.Driver.driverId}`}
                                                    >{raceResult.Driver.familyName}</Link>
                                                </td>
                                                <td className="driversTeam">
                                                    <Link to={`/teamsDetails/${raceResult.Constructor.constructorId}`}>{raceResult.Constructor.name}</Link>
                                                </td>
                                                <td className="driversGrid">
                                                    {/* {"raceResult.Time.time"} */}
                                                    "1:30:03.225"
                                                </td>
                                                <td className="driversGrid"
                                                    style={{
                                                        backgroundColor:
                                                            this.state.colors[
                                                            parseInt(raceResult.position) - 1
                                                            ],
                                                    }}
                                                >
                                                    {raceResult.points}
                                                </td>


                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>




                </div>
            </div>



        )
    }

}






