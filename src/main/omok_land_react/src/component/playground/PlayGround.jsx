import React, {useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";
import ReQuit from "./ReQuit";

function PlayGround(props) {
  
  const param = useParams();
  console.log(param.ip);
  
  return (
    <div className={'container-fluid'} style={{backgroundImage: './omok.jpg'}}>
      <div className={'row'}>
        <div className={'col-sm-1'}></div>
        <div className={'col-sm-6'}>
          <Game ip={param.ip}/>
        </div>
        <div className={'col-sm-4'}>
          <Chat ip={param.ip} />
        </div>
        <div className={'col-sm-1'}></div>
      </div>
    </div>
  )
}

export default PlayGround;