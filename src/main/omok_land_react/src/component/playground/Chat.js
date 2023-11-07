import React, {useCallback, useRef, useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import '../../static/css/chat.css';
import ReQuit from "./ReQuit";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {Box, Button, Fab, IconButton, Popover, Typography} from "@mui/material";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {styled, useTheme} from "@mui/material/styles";

function Chat(props) {
    const theme = useTheme();
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [chatQuit, setChatQuit] = useState(false);
    const [socketData, setSocketData] = useState();
    const [ip, setIp] = useState(props.ip);
    const [anchorEl, setAnchorEl] = useState(null);

    const ws = useRef(null);    //webSocket을 담는 변수,
    //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    const scrollRef = useRef();

    let msgBox = chatt.filter(item1 => item1.topic === 'chat').map((item, idx) => {

        if (item.msg == 'join') {
            return (
                <div key={idx} className={'text-center my-2'}>
                    <span><span className={'fw-bold'}>{item.name}</span>님이 채팅방에 입장하셨습니다.</span>
                </div>
            )
        } else if (item.msg == 'exit') {
            return (
                <div key={idx} className={'text-center my-2'}>
                    <span><span className={'fw-bold'}>{item.name}</span>님이 채팅방을 퇴장하셨습니다.</span>
                </div>
            )
        } else if (item.msg === 'emo1') {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <img src={process.env.PUBLIC_URL + '/img/main/star.png'} style={{width: '50%'}}/>
                </div>
            )
        } else if (item.msg === 'emo2') {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <img src={process.env.PUBLIC_URL + '/img/main/nerd.png'} style={{width: '50%'}}/>
                </div>
            )
        } else if (item.msg === 'emo3') {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <img src={process.env.PUBLIC_URL + '/img/main/serious.png'} style={{width: '50%'}}/>
                </div>
            )
        } else if (item.msg === 'emo4') {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <img src={process.env.PUBLIC_URL + '/img/main/awkward.png'} style={{width: '50%'}}/>
                </div>
            )
        } else if (item.msg === 'emo5') {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <img src={process.env.PUBLIC_URL + '/img/main/shouting.png'} style={{width: '50%'}}/>
                </div>
            )
        } else {
            return (
                <div hidden={chatQuit} key={idx} className={item.name === name ? 'me' : 'other'} id={'msg-box'}>
                    <span><b>{item.name}</b></span> [{item.date.substring(14)}]<br/>
                    <span>{item.msg}</span>
                </div>
            )
        }
    })

    useEffect(() => {
        if (socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            // console.log(tempData);
            tempData.filter(item => item.msg === "join" || item.topic === "game").length > 1 ? props.gaming(true) : props.gaming(false)

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
        // 채팅방 처음 입장할 경우
        if (!chkLog && !chatQuit) {
            if (name === "") {
                alert("이름을 입력하세요.");
                document.getElementById("name").focus();
                return;
            }
            webSocketLogin();
            setChkLog(true);

            const data = {
                name,
                topic: 'chat',
                msg: 'join',
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            } else {
                ws.current.send(temp);
            }
        }
        // 채팅방 나갔다가 재입장할 경우
        else if (!chkLog && chatQuit) {
            setChkLog(true);

            const data = {
                name,
                topic: 'chat',
                msg: 'join',
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)
            const temp = JSON.stringify(data);

            ws.current.send(temp);

            setChatQuit(false);
            setMsg("");
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

            if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            } else {
                ws.current.send(temp);
            }
        } else {
            alert("채팅방 입장 시 가능합니다.");
        }
    }

    // 채팅 전송
    const send = useCallback(() => {
        if (chkLog) {
            if (msg !== '') {
                const data = {
                    name,
                    topic: 'chat',
                    msg,
                    date: new Date().toLocaleString(),
                };  //전송 데이터(JSON)

                const temp = JSON.stringify(data);

                if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                    ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                        console.log(ws.current.readyState);
                        ws.current.send(temp);
                    }
                } else {
                    ws.current.send(temp);

                }
            } else {
                alert("메세지를 입력하세요.");
                document.getElementById("msg").focus();
                return;
            }
            setMsg("");
        } else {
            alert("닉네임 설정 후, 채팅방 입장을 클릭해주세요");
        }
    })

    // 채팅 나가기
    const chatExit = useCallback(() => {
        const data = {
            name,
            topic: 'chat',
            msg: 'exit',
            date: new Date().toLocaleString(),
        };  //전송 데이터(JSON)

        const temp = JSON.stringify(data);

        if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
            ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                console.log(ws.current.readyState);
                ws.current.send(temp);
            }
        } else {
            ws.current.send(temp);
        }
        setMsg('채팅방을 나가셨습니다.');
        setChatQuit(true);
        setChkLog(false);
    });

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <GlobalStyle/>
            <div className={'p-0 m-0'} id="chat-wrap"
                 style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div id='chatt'>
                    <h1 id="title">오목랜드 채팅방</h1>
                    <br/>
                    <Fab aria-describedby={id} variant="contained" onClick={handleClick}
                         sx={{
                             float: 'right',
                             position: 'absolute',
                             transform: 'translateY(340%) translateX(580%)',
                             margin: 1,
                         }}>
                        <InsertEmoticonIcon color={'primary'} fontSize={'large'}/>
                    </Fab>
                    <Popover
                        sx={{marginX: 1}}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{
                            // backgroundColor: 'lightblue',
                            // border: '2px solid blue',
                            borderRadius: '20px',
                            width: '200px',
                            height: '580px',
                        }}>
                            {/*이모티콘 자리*/}
                            {/*<Button value={'1'} onClick={emoSend} variant="outlined">개꿀띠</Button>*/}
                            {/*<Button value={'2'} onClick={emoSend} variant="outlined">포커페이스</Button>*/}
                            {/*<Button value={'3'} onClick={emoSend} variant="outlined">고민중</Button>*/}
                            {/*<Button value={'4'} onClick={emoSend} variant="outlined">당황</Button>*/}
                            {/*<Button value={'5'} onClick={emoSend} variant="outlined">빨리빨리</Button>*/}
                            <Button value={'1'} onClick={emoSend}><img src="/img/main/star.png" alt="" style={{width: '80%'}}/></Button>
                            <Button value={'2'} onClick={emoSend}><img src="/img/main/nerd.png" alt="" style={{width: '80%'}}/></Button>
                            <Button value={'3'} onClick={emoSend}><img src="/img/main/serious.png" alt="" style={{width: '80%'}}/></Button>
                            <Button value={'4'} onClick={emoSend}><img src="/img/main/awkward.png" alt="" style={{width: '80%'}}/></Button>
                            <Button value={'5'} onClick={emoSend}><img src="/img/main/shouting.png" alt="" style={{width: '80%'}}/></Button>
                        </Box>
                    </Popover>
                    <div id='talk' ref={scrollRef}>
                        <div className='talk-shadow'></div>
                        {msgBox}
                    </div>

                    <div className={'mt-2'}>
                        {/*닉네임 설정*/}
                        <div id={'idZone'} className={'input-group'}>
                            <input
                                className={'form-control'}
                                disabled={chkLog}
                                placeholder='이름을 입력하세요.'
                                type='text'
                                id='name'
                                value={name}
                                onChange={(event => setName(event.target.value))}/>
                            <input disabled={chkLog} type={'button'} className={'btn btn-primary ms-1 me-1'}
                                   value={'채팅방 입장'} onClick={nameCheck}/>
                            <input disabled={!chkLog} type={'button'} className={'btn btn-dark'} value={'채팅방 나가기'}
                                   onClick={chatExit}/>
                        </div>
                    </div>


                    {/*감정표현 선택*/}
                    {/*<div className={'mt-2'}>*/}
                    {/*  <Accordion>*/}
                    {/*    <AccordionSummary*/}
                    {/*      aria-controls="panel1a-content"*/}
                    {/*      id="panel1a-header"*/}
                    {/*    style={{padding: '0px'}}>*/}
                    {/*      <div className={'d-flex align-items-center ms-3'}>*/}
                    {/*        <i className="bi bi-outlet" style={{fontSize : '30px', color: 'royalblue'}}></i>*/}
                    {/*        <p className={'ms-2 fw-bold fs-6'} style={{color: 'royalblue'}}>감정표현</p>*/}
                    {/*      </div>*/}

                    {/*    </AccordionSummary>*/}
                    {/*    <AccordionDetails>*/}
                    {/*        <div id={'emotion'}>*/}
                    {/*          <Button value={'1'} onClick={emoSend} variant="outlined">개꿀띠</Button>*/}
                    {/*          <Button value={'2'} onClick={emoSend} variant="outlined">포커페이스</Button>*/}
                    {/*          <Button value={'3'} onClick={emoSend} variant="outlined">고민중</Button>*/}
                    {/*          <Button value={'4'} onClick={emoSend} variant="outlined">당황</Button>*/}
                    {/*          <Button value={'5'} onClick={emoSend} variant="outlined">빨리빨리</Button>*/}
                    {/*        </div>*/}
                    {/*    </AccordionDetails>*/}
                    {/*  </Accordion>*/}
                    {/*</div>*/}


                    {/*채팅메시지*/}
                    <div id='sendZone' className={'input-group mt-2'}>
            <textarea
                placeholder={'메시지를 입력하세요'}
                className={'form-control'}
                disabled={chatQuit}
                id='msg'
                value={msg}
                onChange={onText}
                onKeyDown={(ev) => {
                    if (ev.keyCode === 13) {
                        send();
                    }
                }}></textarea>
                        <input disabled={chatQuit} type='button' value='전송' id='btnSend'
                               className={'btn btn-warning fw-bold'} onClick={send}/>
                    </div>
                </div>
            </div>
            <ReQuit ip={ip} name={name} ws={ws} chatt={chatt} socketData={socketData}/>

        </>
    );
};

export default Chat;