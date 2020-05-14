import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const divStyle = {
    width: "630px",
    minHeight: "630px",
    background: "#ffffff",
    borderRadius: "25px",
    boxShadow: "0px 4px 2px rgba(173, 182, 216, 0.25)",
    textAlign: "center",
    padding: "1rem",
    boxSizing: "border-box",
    gridColumn: "1 / span 2",
    gridRow: "2 / span 2",
}
const spotlightStyle = {
    width: "440px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    gridTemplateColumns: "auto auto",
}
const monsterImg = {
    float: "left",
    objectFit: "cover",
    maxWidth: "250px",
    minWidth: "200px",
    height: "250px",
    textAlign: "left",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "250px"
}

const verticalAlign = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const form = {
    width: "440px",
    marginLeft: "auto",
    marginRight: "auto",
}

const button = {
    width: "100%",
    display: "block",
    gridColumn: "1 / span 2",
    height: "48px",
    marginBottom: "17px"
}
function descendingDate(a,b) {
    if (a.nextSpawn < b.nextSpawn)
      return -1
    else if (a.nextSpawn > b.nextSpawn)
      return 1
    else
      return 0
  }

function DetailedView({onChange, data, spotlight}) {

    const handleChange = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        data_[index].tomb = event.target.value;
        onChange(data_);
    }

    const handleNotes = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        data_[index].notes = event.target.value;
        onChange(data_);
    }

    const handleName = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        data_[index].name = event.target.value;
        onChange(data_);
    }

    const handleNextSpawn = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        
        const hours = event.target.value.substr(0,2)
        const minutes = event.target.value.substr(3,4)

        var nextSpawn = new Date(data_[index].nextSpawn)
        nextSpawn.setHours(parseInt(hours))
        nextSpawn.setMinutes(parseInt(minutes))
        data_[index].nextSpawn = nextSpawn.toISOString()
        onChange(data_.sort(descendingDate));
    }

    const handleAuthor = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        data_[index].author = event.target.value;
        onChange(data_);
    }
    
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    const parseTime = (datetime) => {
        const date = new Date(datetime)
        return zeroPad(date.getHours(), 2) + ":" + zeroPad(date.getMinutes(), 2)
    }

    const updateTime = async () => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);

        const minSpawnTime = data_[index].minSpawnTime
        const now = new Date()
        
        data_[index].lastSeen = now
        data_[index].nextSpawn = new Date(now.getTime() + minSpawnTime*60000);
        onChange(data_.sort(descendingDate));
        saveChanges()
    }

    const saveChanges = (event) => {
        const res = fetch('https://ro-mvp-timer.now.sh/api/saveChanges', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        res
        .then((res) => console.log(res));
    }
    const selectedData = data.find(x => x.id === spotlight);
    return (
        <div style={divStyle}>
            <div style={spotlightStyle}>
                <img style={monsterImg} src={"http://db.irowiki.org/image/monster/" + selectedData.monsterId +".png"} alt="Monster"/>
                <div style={verticalAlign}>
                    <div>
 
                    <TextField style={{marginBottom: "17px", width: "100%"}} label="Boss Name" value={selectedData.name} onChange={handleName}/>

                    <TextField
                        id="time"
                        label="Next Spawn"
                        type="time"
                        style={{marginBottom: "17px", width: "100%"}}
                        value={parseTime(selectedData.nextSpawn)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 60, // 1 min
                        }}
                        onChange={handleNextSpawn}
                    />

                    <TextField style={{marginBottom: "17px", width: "100%"}} label="Author" value={selectedData.author} onChange={handleAuthor} />
                    </div>
                </div>
            </div>
            <br />
            <div style={form}>
                <div style={{marginBottom: "17px"}}><TextField id="standard-basic" fullWidth label="Tomb Location" value={selectedData.tomb} onChange={handleChange}/></div>
                <div style={{marginBottom: "17px"}}><TextField id="standard-basic" fullWidth multiline rows={4} label="Notes" value={selectedData.notes} onChange={handleNotes}/></div>
                <Button style={button} variant="contained" color="primary" onClick={updateTime}>MVP P*WNED</Button>
                <Button style={button} variant="outlined" color="primary" onClick={saveChanges}>Save Changes</Button>
            </div>
        </div>
    )
}

export default DetailedView
