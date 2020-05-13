import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Home.css';

import MVPQueue from '../MVPQueue';
import DetailedView from '../DetailedView';
import useDebouce from '../../utils/useDebounce';


const mvpDataPlaceholder = {
  'id': '0',
  'accessCode': '',
  'monsterId': '1002',
  'name': 'Poring',
  'lastSeen': '2020-05-12T00:00:00.168Z',
  'nextSpawn': '2020-05-12T00:00:00.168Z',
  'tomb': '',
  'isExactTime': 'True',
  'notes': '',
  'author': 'Loading',
}
function Home() {
  const [mvpData, setMvpData] = useState([mvpDataPlaceholder])
  const [spotlight, setSpotlight] = useState('0')
  
  let history = useHistory();
  let { accessCode } = useParams();
  let debouncedCode = useDebouce(accessCode, 1000)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/fetchData?accessCode="+debouncedCode);
      res.json()
      .then(res => setMvpData(res));
    }
    
    fetchData();
  }, [debouncedCode]);

  const handleChangeAccessCode = (event) => {
        accessCode = event.target.value
        history.push('/access/'+accessCode);
  }
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
        <TextField id="standard-basic" style={{width: "100%"}} label="Access Code" value={accessCode} onChange={handleChangeAccessCode} />
        </div>
        <DetailedView onChange={setMvpData} data={mvpData} spotlight={spotlight}/>
        {mvpData.map(data => <MVPQueue onClick={setSpotlight} data={data} key={data.id}/>)}
        </div>
    </div>
  );
}

export default Home;
