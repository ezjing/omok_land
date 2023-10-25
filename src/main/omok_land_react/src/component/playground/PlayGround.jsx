import React, {useEffect, useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";
import ReQuit from "./ReQuit";

function PlayGround(props) {

  const [gaming, setGaming] = useState(false)

  const param = useParams();
  console.log(param.ip);
  
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-sm-1'}></div>
        <div className={'col-sm-6'}>
          <Game ip={param.ip} gaming={gaming}/>
        </div>
        <div className={'col-sm-4'}>
          <Chat ip={param.ip} gaming={setGaming}/>
        </div>
        <div className={'col-sm-1'}></div>
      </div>
    </div>
  )
}

export default PlayGround;