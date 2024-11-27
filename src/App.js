import logo from './logo.svg';
import './App.css';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useState } from 'react';

var ServerIP
var ServerWW
var StartDatum
var EindDatum
var Sprong = 1
var Maandelijks = false

var chartData
var setChartData
var dataScrape = [{ "dagGroep": "2024-11-01", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-02", "sknt": 0, "sknb": 0, "swnb": 196, "swnu": 0 }, { "dagGroep": "2024-11-03", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-04", "sknt": 0, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-05", "sknt": 0, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-06", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-07", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-08", "sknt": 0, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-09", "sknt": 0, "sknb": 0, "swnb": 265, "swnu": 0 }, { "dagGroep": "2024-11-10", "sknt": 88, "sknb": 0, "swnb": 295, "swnu": 0 }, { "dagGroep": "2024-11-11", "sknt": 0, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-12", "sknt": 0, "sknb": 0, "swnb": 299, "swnu": 0 }, { "dagGroep": "2024-11-13", "sknt": 0, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-14", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-15", "sknt": 0, "sknb": 5, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-16", "sknt": 0, "sknb": 4, "swnb": 253, "swnu": 0 }, { "dagGroep": "2024-11-17", "sknt": 21, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-18", "sknt": 79, "sknb": 0, "swnb": 245, "swnu": 0 }, { "dagGroep": "2024-11-19", "sknt": 98, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-20", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-21", "sknt": 0, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-22", "sknt": 11, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-23", "sknt": 99, "sknb": 0, "swnb": 199, "swnu": 0 }, { "dagGroep": "2024-11-24", "sknt": 0, "sknb": 0, "swnb": 349, "swnu": 0 }, { "dagGroep": "2024-11-25", "sknt": 99, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-26", "sknt": 100, "sknb": 0, "swnb": 200, "swnu": 0 }, { "dagGroep": "2024-11-27", "sknt": 0, "sknb": 0, "swnb": 64, "swnu": 0 }]

function App() {
  [chartData, setChartData] = useState(dataScrape)
  return (

    //   <button onClick={() => { Genereer() }}>penis</button>
    <div className="App">
      <p>Server IP:</p>
      <input onChange={(e) => { ServerIP = e.target.value }} />
      <p>Server Wachtwoord:</p>
      <input type='password' onChange={(e) => { ServerWW = e.target.value }} />
      <p>StartDatum:</p>
      <input type='date' onChange={(e) => { StartDatum = e.target.value }} />
      <p>EindDatum:</p>
      <input type='date' onChange={(e) => { EindDatum = e.target.value }} />
      <p>Sprong (maand):</p>
      <input type='number' onChange={(e) => { Sprong = e.target.value }} />
      <input type='checkbox' onChange={(e) => { Maandelijks = e.target.value }} ></input>
      <button onClick={() => { Genereer() }}>Gen</button>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
          <Tooltip />
          <XAxis dataKey="dagGroep" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          <Line type="monotone" dataKey="swnb" stroke="#FB8833" />
          <Line type="monotone" dataKey="sknt" stroke="#17A8F5" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
function Genereer() {
  fetch("https://" + ServerIP + "/backend/getActivity/" + StartDatum + "/" + EindDatum + "/" + Sprong + "/" + ServerWW, { method: "POST" })
    .then(response => response.json())
    .then(data => {
      if (Maandelijks) {
        var newArr = []
        let laatst = 0
        data.forEach(b => {
          let o = b.dagGroep.split('-')
          let m = o[0] * 12 + o[1]
          if (laatst != m) {
            newArr.push({ "dagGroep": m, "swnb": 0, "sknt": 0 })
            laatst = m
          }
          let lengte = newArr.length
          newArr[lengte - 1].swnb += b.swnb
          newArr[lengte - 1].sknt += b.sknt
        });
        setChartData(newArr)
      } else {
        setChartData(data)
      }
    })
    .catch(error => console.log(error))
}

export default App;
