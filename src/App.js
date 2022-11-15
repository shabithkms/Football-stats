import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [leagues, setLeagues] = useState([
        { id: 2021, name: 'Premier League' },
        { id: 2014, name: 'Laliga' },
        { id: 2015, name: 'Ligue 1' },
        { id: 2002, name: 'Bundesliga' },
        { id: 2019, name: 'Serie A' },
    ])
    const [standings, setStandings] = useState([])

    const [selectedLeague, setSelectedLeague] = useState({
        id: 2021,
        name: 'Premier League',
    })

    const fetchStandings = async () => {
        const url = `${process.env.REACT_APP_API_URL}/competitions/${selectedLeague.id}/standings`
        const token = process.env.REACT_APP_API_KEY
        axios
            .get(url, {
                headers: { 'X-Auth-Token': token },
                mode: 'no-cors',
            })
            .then((res) => {
                setStandings(res.data?.standings?.[0]?.table || [])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchStandings()
    }, [selectedLeague])

    return (
        <div className="App container ">
            <header className="App-header text-center mt-4">
                <h1 className="text-center">European Top 5 League standings</h1>
            </header>
            <section className=" mt-5 container-fluid">
                <div className="d-flex  justify-content-center row">
                    {leagues.map((league) => (
                        <div
                            className="btn btn-primary ms-2 me-2 mt-2 col-md-2"
                            key={league.id}
                            onClick={() => setSelectedLeague(league)}
                        >
                            {league.name}
                        </div>
                    ))}
                </div>
            </section>
            <section className="mt-5 mb-3">
                <div className="table-responsive mt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <td colSpan="11">
                                    <h3>{selectedLeague.name}</h3>
                                </td>
                            </tr>
                            <tr>
                                <th className="text-start" colSpan="3">
                                    Club
                                </th>
                                <th className="played">MP</th>
                                <th className="won">W</th>
                                <th className="draw">D</th>
                                <th className="lost">L</th>
                                <th className="points">Pts</th>
                                <th className="gf">GF</th>
                                <th className="ga">GA</th>
                                <th className="gd">GD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((item) => (
                                <tr key={item.position}>
                                    <td>{item.position}</td>
                                    <td className="badge-td">
                                        <div className="badge">
                                            <img
                                                src={item.team.crestUrl}
                                                alt={item.team.name}
                                            />
                                        </div>
                                    </td>
                                    <td className="text-start">
                                        {item.team.name}
                                    </td>
                                    <td>{item.playedGames}</td>
                                    <td>{item.won}</td>
                                    <td>{item.draw}</td>
                                    <td>{item.lost}</td>
                                    <td>{item.points}</td>
                                    <td>{item.goalsFor}</td>
                                    <td>{item.goalsAgainst}</td>
                                    <td>
                                        {item.goalDifference > 0 ? '+' : ''}
                                        {item.goalDifference}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default App
