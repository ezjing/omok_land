import React, {useEffect, useRef, useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";

import Tool from "./Tool";
import {Box} from "@mui/material";

function PlayGround(props) {

  const [gaming, setGaming] = useState(false)
  const [socketData, setSocketData] = useState();
  const [chatt, setChatt] = useState([]);
  const [color, setColor] = useState('black');
  const [name, setName] = useState();

  // 선공후공 결정 (테스트용)
  const [turn, setTurn] = useState()

  const param = useParams();
  // console.log(param.ip);

  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/socket/chatt/" + param.ip);
    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    }
  }, [])

  useEffect(() => {
    if(socketData !== undefined) {

      const tempData = chatt.concat(socketData);
      setChatt(tempData);
      // console.log(tempData);
      if(!gaming && tempData.filter(item => item.msg === 'join' ? item : "").length === 2){
        setGaming(true)
      }
    }
  }, [socketData]);

  return (
    <Box sx={{height: '100vh',
      padding: '0',
      margin: '0',
      overflow: 'hidden'}}>
      <div className={'row'}>
        <div className={'col-sm-1'}></div>
        <div className={'col-sm-6'} style={{zIndex : 1}}>
          <Game gaming={gaming} ws={ws} chatt={chatt} socketData={socketData} turn={turn}/>
        </div>
        <div className={'col-sm-4'} style={{zIndex : 3}}>
          <Tool ip={param.ip} ws={ws} chatt={chatt} socketData={socketData} name={name}/>
          <Chat gaming={setGaming} ip={param.ip} ws={ws} chatt={chatt} socketData={socketData} turn={setTurn} name={setName}/>
        </div>
        <div className={'col-sm-1'}></div>
      </div>
    </Box>
  )
}

export default PlayGround;