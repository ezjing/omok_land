import React, {useCallback, useRef, useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import '../../static/css/chat.css';
import ReQuit from "./ReQuit";

function Chat(props) {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [chatQuit, setChatQuit] = useState(false);
  const [socketData, setSocketData] = useState();
  const [ip, setIp] = useState(props.ip);
  
  const ws = useRef(null);    //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
  
  const scrollRef = useRef();
  
  const msgBox = chatt.filter(item1 => item1.topic === 'chat').map((item, idx) => {
    
    if (item.msg == 'join') {
      return (
        <div key={idx} className={'text-center my-2'} >
          <span><span className={'fw-bold'}>{item.name}</span>님이 입장하셨습니다.</span>
        </div>
      )
    }
    else if (item.msg == 'exit') {
      return (
        <div key={idx} className={'text-center my-2'}>
          <span><span className={'fw-bold'}>{item.name}</span>님이 채팅방을 퇴장하셨습니다.</span>
        </div>
      )
    }
    else if (item.msg === 'emo1') {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <img src={process.env.PUBLIC_URL + '/img/main/star.png'} style={{width: '50%'}} />
        </div>
      )
    }
    else if (item.msg === 'emo2') {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <img src={process.env.PUBLIC_URL + '/img/main/nerd.png'} style={{width: '50%'}} />
        </div>
      )
    }
    else if (item.msg === 'emo3') {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <img src={process.env.PUBLIC_URL + '/img/main/serious.png'} style={{width: '50%'}} />
        </div>
      )
    }
    else if (item.msg === 'emo4') {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <img src={process.env.PUBLIC_URL + '/img/main/awkward.png'} style={{width: '50%'}} />
        </div>
      )
    }
    else if (item.msg === 'emo5') {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <img src={process.env.PUBLIC_URL + '/img/main/shouting.png'} style={{width: '50%'}} />
        </div>
      )
    }
    else {
      return (
        <div key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
          <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
          <span>{item.msg}</span>
        </div>
      )
    }
  })
  
  useEffect(() => {
    if(socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      // console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);
  
  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
  ${reset}
  `;
  
  // 채팅창 밑으로 내리는 훅
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

  }, [chatt]);
  
  
  const onText = event => {
    console.log(event.target.value);
    setMsg(event.target.value);
  }
  
  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:8080/socket/chatt/" + ip);
    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    }
  });
  
  // 채팅 입장
  const nameCheck = useCallback(() => {
    if(!chkLog) {
      if(name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      webSocketLogin();
      setChkLog(true);

      const data = {
        name,
        topic : 'chat',
        msg : 'join',
        date: new Date().toLocaleString(),
      };  //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        }
      } else {
        ws.current.send(temp);
      }
    }
  });
  
  // 감정 표현
  const emoSend = (e) => {
    if (chkLog) {
      console.log(e.target.value);
      const data = {
        name,
        topic: 'chat',
        msg: 'emo' + e.target.value,
        date: new Date().toLocaleString()
      };
  
      const temp = JSON.stringify(data);
  
      if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        }
      } else {
        ws.current.send(temp);
      }
    }
    else {
      alert("닉네임 설정 후, 채팅방 입장을 클릭해주세요");
    }
  }
  
  // 채팅 전송
  const send = useCallback(() => {
    if (chkLog) {
      if(msg !== ''){
        const data = {
          name,
          topic : 'chat',
          msg,
          date: new Date().toLocaleString(),
        };  //전송 데이터(JSON)
    
        const temp = JSON.stringify(data);
    
        if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
          ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
            console.log(ws.current.readyState);
            ws.current.send(temp);
          }
        }else {
          ws.current.send(temp);
      
        }
      }
      else {
        alert("메세지를 입력하세요.");
        document.getElementById("msg").focus();
        return;
      }
      setMsg("");
    }
    else {
      alert("닉네임 설정 후, 채팅방 입장을 클릭해주세요");
    }
  })
  
  // 채팅 나가기
  const chatExit = useCallback(() => {
    const data = {
      name,
      topic : 'chat',
      msg : 'exit',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)
  
    const temp = JSON.stringify(data);
  
    if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    }else {
      ws.current.send(temp);
    }
    setMsg('채팅방을 나가셨습니다.');
    setChatQuit(true);
    ws.current.close();

  });
  
  
  return (
    <>
      <GlobalStyle/>
      <div id="chat-wrap">
        <div id='chatt'>
          <h1 id="title">오목랜드 채팅방</h1>
          <br/>
          <div id='talk' ref={scrollRef}>
            <div className='talk-shadow'></div>
            {msgBox}
          </div>

          
          <div className={'mt-2'}>
            {/*닉네임 설정*/}
            <div id={'idZone'} className={'d-flex align-items-center'}>
              <input
                disabled={chkLog}
                placeholder='이름을 입력하세요.'
                type='text'
                id='name'
                value={name}
                onChange={(event => setName(event.target.value))}/>
              
              <input type={'button'} className={'btn btn-primary ms-auto'} value={'채팅방 입장'} onClick={nameCheck} />
              <input type={'button'} className={'btn btn-dark ms-auto'} value={'채팅방 나가기'} onClick={chatExit} />
              
            </div>

          </div>

          
          {/*감정표현 선택*/}
          <div className={'mt-1'}>
            <i className="bi bi-outlet" style={{fontSize : '30px'}}></i>
            <div className={'bg-white p-2'} id={'emotion'}>
              <ul className={'d-flex justify-content-between'}>
                <li><button type={'button'} value={'1'} onClick={emoSend}>개꿀띠</button></li>
                <li><button type={'button'} value={'2'} onClick={emoSend}>포커페이스</button></li>
                <li><button type={'button'} value={'3'} onClick={emoSend}>고민중</button></li>
                <li><button type={'button'} value={'4'} onClick={emoSend}>당황</button></li>
                <li><button type={'button'} value={'5'} onClick={emoSend}>빨리빨리</button></li>
              </ul>
            </div>
          </div>
          
          {/*채팅메시지*/}
          <div id='sendZone'>
            <textarea
              disabled={chatQuit}
              id='msg'
              value={msg}
              onChange={onText}
              onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
            <input disabled={chatQuit} type='button' value='전송' id='btnSend' onClick={send} />
          </div>
        </div>
      </div>
      <ReQuit ip={ip} name={name} ws={ws} chatt={chatt} socketData={socketData}/>
      
    </>
  );
};

export default Chat;