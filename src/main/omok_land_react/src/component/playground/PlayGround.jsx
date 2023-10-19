import React, {useState} from 'react';
import Chat from "../Chat";
import {useLocation, useParams} from "react-router-dom";

function PlayGround(props) {
  
  const param = useParams();
  console.log(param.ip);
  
  return (
    <div>
      <p>대국방 링크 : localhost:3000/playground/{param.ip}</p>
      <Chat ip={param.ip}/>
    </div>
  )
}

export default PlayGround;