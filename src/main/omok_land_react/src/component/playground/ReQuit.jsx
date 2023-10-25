import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../../static/css/reQuit.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function ReQuit(props) {
  const [msg, setMsg] = useState("");
  const [chatt, setChatt] = useState([]);
  const [socketData, setSocketData] = useState();
  const [ip, setIp] = useState(props.ip);
  const [ws, setWs] = useState(props.ws);
  const [visible, setVisible] = useState(true);
  
  const navi = useNavigate();
  
  useEffect(() => {
    setChatt(props.chatt);
    setSocketData(props.socketData);
    
  }, [props.socketData]);
  
  useEffect(() => {
    if(socketData !== undefined) {

      const tempData = chatt.concat(socketData);
      // console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);
  
  // 재경기 요청
  const reGame = () => {
    
    const data = {
      name : props.name,
      topic : 'apply',
      msg : 'regame',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)
  
    const temp = JSON.stringify(data);
  
    if(ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
  }
  
  // 재경기 수락
  const accept = () => {
    axios.get(`http://localhost:8080/server/getIp`) // ip 호출 axios
      .then(res => {
        console.log(res.data);
        setIp(res.data);
      })
      .catch(err => {
        alert(`통신 실패`);
      });
  
    const data = {
      name : props.name,
      topic : 'answer',
      msg : ip,
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)
  
    const temp = JSON.stringify(data);
  
    if(ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
    window.location.reload();
    navi(`/playground/111`);
    
  }
  
  // 재경기 거절
  const reject = () => {
    const data = {
      name : props.name,
      topic : 'answer',
      msg : 'reject',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)
  
    const temp = JSON.stringify(data);
  
    if(ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
    navi('/main');
  }
  
  // 대국방 퇴장
  const gameExit = () => {
    const data = {
      name : props.name,
      topic : 'game',
      msg : 'exit',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)
  
    const temp = JSON.stringify(data);
  
    if(ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
    navi('/main');
  }
  
  // 재경기 요청 창(상대에게)
  const regameModal = chatt.filter(item1 => item1.topic === 'apply').map((item, idx) => {
    if (item.msg === 'regame' && item.name !== props.name && idx === 0) {
      return (
        <div className="card border-5 border-black" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
            <span><b className={'fw-bold'}>{item.name}</b>님이 재경기를 신청하였습니다.<br/>수락하시겠습니까?</span>
            <div className={'d-flex justify-content-end'}>
              <button type="button" className="btn btn-success me-2" onClick={accept}>수락</button>
              <button type="button" className="btn btn-danger" onClick={reject}>거절</button>
            </div>
          </div>
        </div>
      )
    }
  })
  
  // 재경기 요청 결과 창
  const regameResult = chatt.filter(item1 => item1.topic === 'answer').map((item, idx) => {
    if (item.msg === 'reject' && item.name !== props.name && visible === true) {
      return (
        <div className="card border-5 border-black" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
            <span>상대방이 재경기를 거절하였습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                setVisible(false);
              }}>확인</button>
            </div>
          </div>
        </div>
      )
    }
    else if (item.msg !== 'reject' && item.name !== props.name && visible === true) {
      return (
        <div className="card border-5 border-black" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
            <span>상대방이 재경기를 수락하였습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                window.location.reload();
                navi(`/playground/${item.msg}`);
              }}>확인</button>
            </div>
          </div>
        </div>
      )
    }
  })
  
  // 대국방 퇴장 알림 창
  const gameInOut = chatt.filter(item1 => item1.topic === 'game').map((item, idx) => {
    if (item.msg === 'exit' && item.name !== props.name && visible === true) {
      return (
        <div className="card border-5 border-black" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">탈주닌자 발생</h5>
            <span>상대방이 대국방을 나갔습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                setVisible(false);
              }}>확인</button>
            </div>
          </div>
        </div>
      )
    }
  })
  
  
  return (
    <div className={'mt-3'}>
      <div>
        {/*<span className={'fs-5 text-white'}>{props.name}</span>*/}
        <button className={'game-re'} onClick={reGame}>재경기 신청</button>
        <button className={'game-exit'} onClick={gameExit}>대국방 퇴장</button>
      </div>
      <div id={'regame-modal'}>
        {regameModal}
        {regameResult}
        {gameInOut}
      </div>

    </div>
  )
}

export default ReQuit;