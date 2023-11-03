import React, {useCallback, useEffect, useRef, useState} from "react";
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {Box, Button} from "@mui/material";
import Pan from "./Pan";
import {useParams} from "react-router-dom";
import axios from "axios";

function Game(props) {
  const param = useParams();
  const [coordinate, setCoordinate] = useState('');
  const [color, setColor] = useState('');    // 검정 선
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  // const [socketData, setSocketData] = useState();
  // const [ip, setIp] = useState(props.ip);


  // 흑백 정해주기
  useEffect(() => {

    // ( 실제 적용 시)
  //   axios.get(`http://localhost:8080/server/getIp`) // ip 호출 axios
  //   .then(res => {
  //
  //     param.ip === res.data ? setColor('black') : setColor('white');
  //   })
  //   .catch(err => {
  //     alert(`통신 실패`);
  //   });


  }, []);

  useEffect(() => {
    // 임시
    if(props.chatt.length > 0) setColor(props.chatt.filter(item => item.msg === 'join')[0].name === props.turn ? 'black' : 'white');
  }, [props.chatt]);

  useEffect(() => {
    
    // 좌표 클릭시 이벤트
    if (props.gaming) {

      if (props.chatt.filter(item => item.topic === "game" ? item : "").length > 0) {

        setChatt(props.chatt.filter(item => item.topic === "game"))
        // 좌표 분리
        let [x, y] = coordinate.split(', ').map(item => +item);

        // 착수의 가로줄 배열
        let garo = chatt.filter(item => +item.coordinate.slice(item.coordinate.indexOf(', ')) === y)
        .sort((a, b) => +b.coordinate.slice(0, b.coordinate.indexOf(',')) - +a.coordinate.slice(0, b.coordinate.indexOf(',')));

        // 착수의 세로줄 배열
        let sero = chatt.filter(item => +item.coordinate.slice(0, item.coordinate.indexOf(',')) === x)
        .sort((a, b) => +b.coordinate.slice(b.coordinate.indexOf(', ') + 2) - +a.coordinate.slice(0, b.coordinate.indexOf(', ') + 2));

        // 착수의 좌상 우하 대각선 배열
        let daegak1 = chatt.filter(item => {
          let [x1, y1] = item.coordinate.split(', ').map(Number);
          return Math.abs(x1 - x) === Math.abs(y1 - y);
        }).sort((a, b) => {
          let [x1, y1] = a.coordinate.split(', ').map(Number);
          let [x2, y2] = b.coordinate.split(', ').map(Number);
          return y2 - y1;
        });

        // 착수의 좌하 우상 대각선 배열
        let daegak2 = chatt.filter(item => {
          let [x1, y1] = item.coordinate.split(', ').map(Number);
          return Math.abs(x1 - x) === Math.abs(y1 - y);
        }).sort((a, b) => {
          let [x1, y1] = a.coordinate.split(', ').map(Number);
          let [x2, y2] = b.coordinate.split(', ').map(Number);
          return y1 - y2;
        });


        // 승리 조건
        let cnt = 0;

        // 가로 검사
        garo.map((item, idx) => {
          item.color === color ? cnt++ : cnt = 0;
          console.log(cnt)
          if (cnt === 5) {
            // 정상 실행 확인
            alert('###################승리##################')
            // 승리 이후 루트 고민해야함
          }
        })
        // 세로 검사
        sero.map((item, idx) => {
          item.color === color ? cnt++ : cnt = 0;
          console.log(cnt)
          if (cnt === 5) {
            alert('###################승리##################')
          }
        })
        // 대각선 검사
        daegak1.map((item, idx) => {
          item.color === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            alert('###################승리##################');
          }
        });

        daegak2.map((item, idx) => {
          item.color === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            alert('###################승리##################');
          }
        });

      }

        // 해당 없을 경우 착수
        if (coordinate !== "") {
          const data = {  // 이름, 메시지, 날짜 저장
            topic: 'game',
            color,
            coordinate,
            date: new Date().toLocaleString(),
          };  //전송 데이터(JSON)
          const temp = JSON.stringify(data);
          props.ws.current.send(temp);

        }
        // else {
        //   alert("바둑돌을 놓으세요.");
        //   document.getElementById("coordinate").focus();
        //   return;
        // }

      } // 이미 값이 있을경우 뭐 하려면 else 문 넣기


  }, [coordinate])

  // useEffect(() => {   // 채팅이 계속 이어지도록 하는 이펙트
  //   if (socketData !== undefined) {
  //     const tempData = chatt.concat(socketData);
  //     console.log("game temp")
  //     console.log(tempData)
  //     // console.log(tempData.filter(item => item.topic === "game"));
  //     setChatt(tempData);
  //   }
  // }, [socketData]);


  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
  ${reset}
  `;

  return (
    <Box>
      <GlobalStyle/>
      <Pan coordinate={setCoordinate} gaming={props.gaming} color={color} gameArr={props.chatt.filter(item => item.topic === "game" ? item : "")}/>
    </Box>
  )
}

export default Game;