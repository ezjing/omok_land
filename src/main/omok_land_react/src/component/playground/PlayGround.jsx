import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";
import ReQuit from "./ReQuit";
import {Box, Button, Grid, IconButton, Stack} from "@mui/material";
import Tool from "./Tool";


function PlayGround(props) {
    const [gaming, setGaming] = useState(false)

    const param = useParams();
    console.log(param.ip);

    return (
        <Box sx={{height: '100vh',
            padding: '0',
            margin: '0',
            overflow: 'hidden'}}>
            <div className={'row'}>
                <div className={'col-sm-1'}></div>
                <div className={'col-sm-6'}>
                    <Game ip={param.ip} gaming={gaming}/>
                </div>
                <div className={'col-sm-4'}>
                    <Tool/>
                    <Chat ip={param.ip} gaming={setGaming}/>
                </div>
                <div className={'col-sm-1'}></div>
            </div>
        </Box>
    )
}

export default PlayGround;