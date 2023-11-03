import React, {useEffect, useRef, useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";
import ReQuit from "./ReQuit";

function PlayGround(props) {

  const [gaming, setGaming] = useState(false)
  const [socketData, setSocketData] = useState();
  const [chatt, setChatt] = useState([]);

  const param = useParams();
  console.log(param.ip);

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
      // console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-sm-1'}></div>
        <div className={'col-sm-6'}>
          <Game ip={param.ip} gaming={gaming}/>
        </div>
        <div className={'col-sm-4'}>
          <Chat gaming={setGaming} ws={ws} chatt={chatt} socketData={socketData}/>
        </div>
        <div className={'col-sm-1'}></div>
      </div>
    </div>
  )
}

export default PlayGround;