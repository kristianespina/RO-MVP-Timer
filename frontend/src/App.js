import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

import MVPQueue from './components/MVPQueue';
import DetailedView from './components/DetailedView';


const spotlightPlaceholder = {
  'id': '',
  'accessKey': '',
  'monsterId': '1002',
  'name': 'Poring',
  'lastSeen': '2020-05-12T00:00:00.168Z',
  'nextSpawn': '2020-05-12T00:00:00.168Z',
  'tomb': '',
  'isExactTime': 'True',
  'notes': '',
  'author': 'Loading',
}
function App() {
  const [mvpData, setMvpData] = useState([])
  const [spotlight, setSpotlight] = useState(spotlightPlaceholder)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000");
      res.json()
      .then(res => setMvpData(res))
      .then(res => console.log(res));
    }
    
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div style={{gridColumn: "1 / span 2"}}></div>
        <div>
          <Button
          variant="contained"
          color="primary"
          style={{width: "100%", height: "48px"}}
          >
            + ADD MVP TO LIST
          </Button>
        </div>
        <div>
        <TextField id="standard-basic" style={{width: "100%"}} label="Access Code" />
        </div>
        <DetailedView onChange={setSpotlight} data={spotlight}/>
        {mvpData.map(data => <MVPQueue onClick={setSpotlight} data={data} key={data.id}/>)}
      </div>
    </div>
  );
}

export default App;
