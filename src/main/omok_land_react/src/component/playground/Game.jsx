import React, {useCallback, useEffect, useRef, useState} from "react";
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {Box, Button} from "@mui/material";
import Pan from "./Pan";

function Game(props) {
    const [coordinate, setCoordinate] = useState('');
    const [color, setColor] = useState("black");    // 검정 선
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const [ip, setIp] = useState(props.ip);

    const ws = useRef(null);    //webSocket을 담는 변수,
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    useEffect( () => {
        if(coordinate !== ""){

            if(!chkLog) {
                webSocketLogin();
                setChkLog(true);
            }

            if(coordinate !== ""){
                const data = {  // 이름, 메시지, 날짜 저장
                    topic : 'game',
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
        alert(coordinate)
        }
    }, [coordinate])

    useEffect(() => {   // 채팅이 계속 이어지도록 하는 이펙트
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            setChatt(tempData);
        }
    }, [socketData]);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt/" + ip);   // 웹소켓 주소

        ws.current.onmessage = (message) => {   // 웹소켓 메시지 입력 되는 부분
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });

    return (
        <Box>
            <GlobalStyle/>
            <Pan coordinate={setCoordinate}/>
        </Box>
    )
}

export default Game;