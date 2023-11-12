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
  const [finish, setFinish] = useState(false);
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
    if (props.chatt.length > 0) {

      setColor(props.chatt.filter(item => item.msg === 'join')[0].name === props.turn ? 'black' : 'white')

      if (props.chatt.filter(item => item.topic === 'finish' ? item : "").length > 0) {
        let winner = props.chatt.filter(item => item.topic === 'finish' ? item : "")[0].color
        if (winner === color) {
          // 승리 루트
          alert(`승리 : ${color}`)
        } else if (winner !== color) {
          // 패배 루트
          alert(`패배 : ${color}`)
        }
      }
    }
  }, [props.chatt]);

  useEffect(() => {

    // 좌표 클릭시 이벤트
    if (props.gaming) {

      if (props.chatt.filter(item => item.topic === "game" ? item : "").length > 0) {

        // 좌표 분리
        let [x, y] = coordinate.split(', ').map(item => +item);

        // 승리 조건 확인을 위한 15x1 빈 배열 생성
        let garo = Array(15).fill(Array(`0, ${coordinate.split(', ')[1]}`, 'empty'));
        let sero = Array(15).fill(Array(`${coordinate.split(', ')[0]}, 0`, 'empty'));

        // 좌표의 좌상우하 대각선
        let daegak1 = [];
        for (let x = +coordinate.split(', ')[0], y = +coordinate.split(', ')[1]; x >= 0 && y >= 0; x--, y--) {
          daegak1.push([`${x}, ${y}`, 'empty']);
        }
        for (let x = +coordinate.split(', ')[0] + 1, y = +coordinate.split(', ')[1] + 1; x < 15 && y < 15; x++, y++) {
          daegak1.push([`${x}, ${y}`, 'empty']);
        }

        // 좌표의 좌하우상 대각선
        let daegak2 = [];
        for (let x = +coordinate.split(', ')[0], y = +coordinate.split(', ')[1]; x >= 0 && y < 15; x--, y++) {
          daegak2.push([`${x}, ${y}`, 'empty']);
        }
        for (let x = +coordinate.split(', ')[0] + 1, y = +coordinate.split(', ')[1] - 1; x < 15 && y >= 0; x++, y--) {
          daegak2.push([`${x}, ${y}`, 'empty']);
        }
        setChatt(props.chatt.filter(item => item.topic === "game"))

        // 인덱스 추출을 위한 좌표만 있는 배열
        let filtered1 = daegak1.map(item => item[0]);
        let filtered2 = daegak2.map(item => item[0]);

        // 빈배열에 착수 기록 업데이트
        props.chatt.filter(item1 => item1.topic === "game" ? item1 : "").map((item2) => {

          let [x1, y1] = item2.coordinate.split(', ')

          if (+y1 === y) {
            garo[x1] = [item2.coordinate, item2.color]
          }
          if (+x1 === x) {
            sero[y1] = [item2.coordinate, item2.color]
          }
          if (filtered1.indexOf(item2.coordinate) !== -1) {
            daegak1[filtered1.indexOf(item2.coordinate)] = [item2.coordinate, item2.color];
          }
          if (filtered2.indexOf(item2.coordinate) !== -1) {
            daegak2[filtered2.indexOf(item2.coordinate)] = [item2.coordinate, item2.color];
          }
        })

        // 방금 누른 좌표 합치기, 대각선 배열 정렬
        garo[coordinate.split(', ')[0]] = [coordinate, color]
        sero[coordinate.split(', ')[1]] = [coordinate, color]
        daegak1[0] = [coordinate, color]
        daegak2[0] = [coordinate, color]
        daegak1.sort((a, b) => a[0].split(', ')[0] - b[0].split(', ')[0]);
        daegak2.sort((a, b) => a[0].split(', ')[0] - b[0].split(', ')[0]);

        // console.log(garo)
        // console.log(sero)
        // console.log(daegak1)
        // console.log(daegak2)

        // 승리 조건 (완료)
        let cnt = 0;
        // 가로 검사
        garo.map((item) => {
          item[1] === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            setFinish(true)
          }
        })
        cnt = 0;
        // 세로 검사
        sero.map((item) => {
          item[1] === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            setFinish(true)
          }
        })
        cnt = 0;
        // 대각선 검사
        daegak1.map((item) => {
          item[1] === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            setFinish(true);
          }
        });
        cnt = 0;
        daegak2.map((item) => {
          item[1] === color ? cnt++ : cnt = 0;
          if (cnt === 5) {
            setFinish(true);
          }
        });

        // 금수

        // 착수 좌표의 가로 상의 열린 3 카운트

        // 왼쪽
        console.log(garo)
        // asd
        console.log(coordinate)
        // 중간

        // 오른쪽

        // 좌표 기준의 가로, 세로 대각선의 4칸까지 필터 해줘야함

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

        // 타이머 시간 초기화

      }

    } // 이미 값이 있을경우 뭐 하려면 else 문 넣기


  }, [coordinate])


  useEffect(() => {
    if (finish) {
      const data = {  // 이름, 메시지, 날짜 저장
        topic: 'finish',
        color
      };  //전송 데이터(JSON)
      const temp = JSON.stringify(data);
      props.ws.current.send(temp);
    }
  }, [finish]);

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
      <Pan coordinate={setCoordinate} gaming={props.gaming} color={color}
           gameArr={props.chatt.filter(item => item.topic === "game" ? item : "")}/>
    </Box>
  )
}

export default Game;