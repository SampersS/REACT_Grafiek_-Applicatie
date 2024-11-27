import logo from './logo.svg';
import './App.css';

var ServerIP
var ServerWW
var StartDatum
var EindDatum
var Sprong
function App() {
  return (
    <div className="App">
      <p>Server IP:</p>
      <input onChange={(e) => { ServerIP = e.target.value }} />
      <p>Server Wachtwoord:</p>
      <input type='password' onChange={(e) => { ServerWW = e.target.value }} />
      <p>StartDatum:</p>
      <input type='date' onChange={(e) => { StartDatum = e.target.value }} />
      <p>EindDatum:</p>
      <input type='date' onChange={(e) => { EindDatum = e.target.value }} />
      <p>Sprong:</p>
      <input type='number' onChange={(e) => { Sprong = e.target.value }} />
      <button onClick={() => { Genereer() }}>penis</button>
    </div>
  );
}
function Genereer() {
  console.log(ServerIP, StartDatum, EindDatum, Sprong)
}

export default App;
