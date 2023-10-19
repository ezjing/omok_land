import React, {useState} from 'react';
import Chat from "./Chat";
import {useLocation, useParams} from "react-router-dom";
import Game from "./Game";

function PlayGround(props) {
  
  const param = useParams();
  console.log(param.ip);
  
  return (
    <div className={'container-fluid'} style={{backgroundColor: 'lightblue'}}>
      <div className={'row'}>
        <div className={'col-sm-1'}></div>
        <div className={'col-sm-6'}>
          <Game/>
        </div>
        <div className={'col-sm-4'}>
          {/*<p>대국방 링크 : localhost:3000/playground/{param.ip}</p>*/}
          <Chat ip={param.ip}/>
        </div>
        <div className={'col-sm-1'}></div>
      </div>
    </div>
  )
}

export default PlayGround;