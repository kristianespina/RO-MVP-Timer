import React from 'react'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import IMG_KIEL from './kiel.gif'

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
const spotlight = {
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
    height: "250px",
    textAlign: "left",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "250px"
}

const details = {
    fontSize: "30px",
    lineHeight: "35px",
    marginBottom: "17px",
    textAlign: "left",
}

const caption = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#9B9B9B",
    lineHeight: "16px",
    textAlign: "left",
    textDecoration: "uppercase",
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
const formCaption = {
    fontSize: "20px",
    lineHeight: "37px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "23px",
    textAlign: "left",
}
const formInput = {
    background: "#F4F4F4",
    height: "35px",
    borderRadius: "15px",
    border: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "16px",
    marginBottom: "23px",
}
const button = {
    width: "100%",
    display: "block",
    gridColumn: "1 / span 2",
    height: "48px",
    marginBottom: "17px"
}
const notes = {
    background: "#F4F4F4",
    borderRadius: "15px",
    border: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "12px",
    height: "87px",
    marginBottom: "23px",
    resize: "vertical",
}

function formatTime(time, prefix = "") {
    return typeof time == "object" ? prefix + time.toLocaleTimeString() : "";
}

function DetailedView({onChange, data}) {
    const handleChange = (event) => {
        data.tomb = event.target.value;
        onChange(data);
    }
    return (
        <div style={divStyle}>
            <div style={spotlight}>
                <img style={monsterImg} src={"http://db.irowiki.org/image/monster/" + data.monsterId +".png"} alt="Monster"/>
                <div style={verticalAlign}>
                    <div>
                    <p style={caption}>BOSS NAME</p>
                    <p style={details}>{data.name}</p>
                    
                    <p style={caption}>NEXT SPAWN</p>
                    <p style={details}>{formatTime(new Date(data.nextSpawn))}</p>

                    <p style={caption}>UPDATED BY</p>
                    <p style={details}>{data.author}</p>
                    </div>
                </div>
            </div>
            <br />
            <div style={form}>
                <div style={{marginBottom: "17px"}}><TextField id="standard-basic" fullWidth label="Tomb Location" value={data.tomb} onChange={handleChange}/></div>
                <div style={{marginBottom: "17px"}}><TextField id="standard-basic" fullWidth multiline rows={4} label="Notes" defaultValue={data.notes} /></div>
                <Button style={button} variant="contained" color="primary">MVP P*WNED</Button>
                <Button style={button} variant="outlined" color="primary">Save Changes</Button>
            </div>
        </div>
    )
}

export default DetailedView
