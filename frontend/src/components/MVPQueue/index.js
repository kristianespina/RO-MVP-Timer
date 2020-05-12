import React from 'react'

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

function formatTime(time, prefix = "") {
    return typeof time == "object" ? prefix + time.toLocaleTimeString() : "";
}

function MVPQueue({onClick, data}) {
    return (
        <div className="card" style={divStyle} onClick={() => onClick(data.id)}>
            <img style={monsterImg} src={"http://db.irowiki.org/image/monster/" + data.monsterId +".png"} alt="Monster"/>
            <p style={monsterName}>{data.name}</p>
            <br />
            <p style={monsterDetails}>{formatTime(new Date(data.nextSpawn))}</p>
            <p style={monsterDetails}>{data.tomb}</p>
            <p style={monsterDetails}>Updated by: {data.author}</p>
        </div>
    )
}

export default MVPQueue
