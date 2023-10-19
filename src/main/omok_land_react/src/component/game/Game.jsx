import React, {useCallback, useEffect, useRef, useState} from "react";
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {Box, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function Game(props) {
    const [coordinate, setCoordinate] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("black");    // 검정 선
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const [ip, setIp] = useState('1234');

    const ws = useRef(null);    //webSocket을 담는 변수,
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    const msgBox = chatt.map((item, idx) => (
        <div key={idx} className={item.color === color ? 'me' : 'other'}>
            <span><b>{item.color}</b></span> [ {item.date} ]<br/>
            <span>{item.coordinate}</span>
        </div>
    ));

    useEffect(() => {   // 채팅이 계속 이어지도록 하는 이펙트
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
        }
    }, [socketData]);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

    const onCoordinate = event => {
        console.log(event.target.value);
        setCoordinate(event.target.value);
    }


    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt/" + ip);   // 웹소켓 주소

        ws.current.onmessage = (message) => {   // 웹소켓 메시지 입력 되는 부분
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });


    const sendCoordinate = useCallback(() => {    // 웹소켓 데이터 입력 되는 부분, 수정 필요 (이름, 색 일치해야 둘수 있도록 불일치 시 경고창 출력)
        if(!chkLog) {
            if(color === "") {
                alert("이름을 입력하세요.");
                document.getElementById("color").focus();
                return;
            }
            webSocketLogin();
            setChkLog(true);
        }

        if(coordinate !== ''){
            const data = {  // 이름, 메시지, 날짜 저장
                color,
                coordinate,
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
        }else {
            alert("바둑돌을 놓으세요.");
            document.getElementById("coordinate").focus();
            return;
        }
        setCoordinate("");
        if (color == 'black') {
            setColor('white');
        }
        else if (color =='white') {
            setColor('black');
        }
    });

    return (
        <Box>
            <GlobalStyle/>
            {/*<div id="chat-wrap">*/}
            {/*    <div id='chatt'>*/}
            {/*        <h1 id="title">WebSocket Chatting</h1>*/}
            {/*        <br/>*/}
            {/*        <div id='talk'>*/}
            {/*            <div className='talk-shadow'></div>*/}
            {/*            {msgBox}*/}
            {/*        </div>*/}
            {/*        <input disabled={chkLog}*/}
            {/*               placeholder='이름을 입력하세요.'*/}
            {/*               type='text'*/}
            {/*               id='name'*/}
            {/*               value={name}*/}
            {/*               onChange={(event => setName(event.target.value))}/>*/}
            {/*        <div id='sendZone'>*/}
            {/*            <textarea id='msg' value={msg} onChange={onText}*/}
            {/*                      onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>*/}
            {/*            <input type='button' value='전송' id='btnSend' onClick={send}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Button variant={'contained'} color="success" value={'1, 1'} onClick={onCoordinate}>좌표 1</Button>
            <Button variant={'outlined'} color="error" value={'2, 2'} onClick={onCoordinate}>좌표 2</Button>
            <Button variant={'contained'} color={'secondary'} value={'3, 3'} onClick={onCoordinate}>좌표 3</Button>
            <Button variant="contained" endIcon={<SendIcon/>} onClick={sendCoordinate}>제출</Button>
        </Box>
    )
}

export default Game;