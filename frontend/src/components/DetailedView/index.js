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
        data_[index].nextSpawn = event.target.value;
        onChange(data_);
    }

    const handleAuthor = (event) => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);
        data_[index].author = event.target.value;
        onChange(data_);
    }

    const updateTime = async () => {
        var data_ = [...data]
        var index = data.findIndex(obj => obj.id === spotlight);

        const zeroPad = (num, places) => String(num).padStart(places, '0')

        const minSpawnTime = data_[index].minSpawnTime
        const hourIncrement = Math.floor(minSpawnTime/60)
        const minuteIncrement = Math.floor(minSpawnTime%60)
        const now = new Date

        const minute = (now.getMinutes() + minuteIncrement)%60
        const hour = (now.getHours() + hourIncrement + Math.floor( (parseInt(now.getMinutes()) + minuteIncrement)/60 ))%24

        const nextSpawn = zeroPad(hour, 2) + ":" + zeroPad(minute, 2)
        console.log(nextSpawn)
    }

    const saveChanges = (event) => {
        console.log("triggered");
        const res = fetch('http://localhost:5000/saveChanges', {
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
                        value={selectedData.nextSpawn}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 60, // 5 min
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
