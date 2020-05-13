import React from 'react'
import Chip from '@material-ui/core/Chip';

const divStyle = {
    width: "300px",
    height: "300px",
    background: "#ffffff",
    borderRadius: "25px",
    boxShadow: "0px 4px 2px rgba(173, 182, 216, 0.25)",
    textAlign: "center",
    padding: "1rem",
    boxSizing: "border-box"
}

const monsterImg = {
    textAlign: "center",
    margin: "0 auto",
    height: "150px",
}

const monsterName = {
    fontSize: "24px",
    lineHeight: "28px",
}

const monsterDetails = {
    fontSize: "14px",
    lineHeight: "16px",
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

function MVPQueue({onClick, data}) {
    const statusComponent = () => {
        var diff = new Date(data.nextSpawn) - new Date();
        if (diff < 0) {
            return (
                <Chip
                    size="small"
                    label="Status: Alive"
                    clickable
                    color="primary"
                />)
        }
        var minutes = Math.floor((diff/1000)/60);
        return (
            <Chip
                variant="outline"
                size="small"
                label={"Respawn in : " + minutes + " minutes"}
                clickable
                color="secondary"
            />)
    }

    const getSpawnTime = () => {
        const nextSpawn = new Date(data.nextSpawn)
        return zeroPad(nextSpawn.getHours(),2) + ":" + zeroPad(nextSpawn.getMinutes(),2)
    }
    return (
        <div className="card" style={divStyle} onClick={() => onClick(data.id)}>
            <img style={monsterImg} src={"http://db.irowiki.org/image/monster/" + data.monsterId +".png"} alt="Monster"/>
            <p style={monsterName}>{data.name}</p>
            <br />
            {statusComponent()}
            <br />
            <br />
            <p style={monsterDetails}>{"Respawn Time : " + getSpawnTime()}</p>

        </div>
    )
}

export default MVPQueue
