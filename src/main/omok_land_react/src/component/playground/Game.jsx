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
      props.color(color);

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

        // 열린3 초기화
        let opened3 = 0;
        // 좌표 기준 가로 열린 3 검사
        // 왼쪽
        let filteredGaro1 = garo.filter(
          (item, idx) => {
            return (idx >= x - 3 && idx <= x+1 ? item : "")
          })
        if(filteredGaro1.length === 5) {
          filteredGaro1.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 중간
        let filteredGaro2 = garo.filter(
          (item, idx) => {
            return (idx >= x - 2 && idx <= x+2 ? item : "")
          })
        if(filteredGaro2.length === 5) {
          filteredGaro2.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 오른쪽
        let filteredGaro3 = garo.filter(
          (item, idx) => {
            return (idx >= x - 1 && idx <= x+3 ? item : "")
          })
        if(filteredGaro3.length === 5) {
          filteredGaro3.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }

        // 좌표 기준 세로 열린 3 검사
        // 위쪽
        let filteredSero1 = sero.filter(
          (item, idx) => {
            return (idx >= y - 3 && idx <= y+1 ? item : "")
          })
        if(filteredSero1.length === 5) {
          filteredSero1.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 중간
        let filteredSero2 = sero.filter(
          (item, idx) => {
            return (idx >= y - 2 && idx <= y+2 ? item : "")
          })
        if(filteredSero2.length === 5) {
          filteredSero2.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 아래쪽
        let filteredSero3 = sero.filter(
          (item, idx) => {
            return (idx >= y - 1 && idx <= y+3 ? item : "")
          })
        if(filteredSero3.length === 5) {
          filteredSero3.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }

        //대각선
        let filteredDaegak11 = daegak1.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 3 && item[0].split(', ')[0] <= x+1 ? item : "")
          })
        if(filteredDaegak11.length === 5) {
          filteredDaegak11.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 중간
        let filteredDaegak12 = daegak1.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 2 && item[0].split(', ')[0] <= x+2 ? item : "")
          })
        if(filteredDaegak12.length === 5) {
          filteredDaegak12.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 오른쪽
        let filteredDaegak13 = daegak1.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 1 && item[0].split(', ')[0] <= x+3 ? item : "")
          })
        if(filteredDaegak13.length === 5) {
          filteredDaegak13.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }

        let filteredDaegak21 = daegak2.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 3 && item[0].split(', ')[0] <= x+1 ? item : "")
          })
        if(filteredDaegak21.length === 5) {
          filteredDaegak21.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 중간
        let filteredDaegak22 = daegak2.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 2 && item[0].split(', ')[0] <= x+2 ? item : "")
          })
        if(filteredDaegak22.length === 5) {
          filteredDaegak22.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }
        // 오른쪽
        let filteredDaegak23 = daegak2.filter(
          (item, idx) => {
            return (item[0].split(', ')[0] >= x - 1 && item[0].split(', ')[0] <= x+3 ? item : "")
          })
        if(filteredDaegak23.length === 5) {
          filteredDaegak23.reduce((acc, cur, idx) => {
            if (idx === 0 && cur[1] === 'empty') {
              acc++
            } else if (idx <= 3 && cur[1] === color) {
              acc++
            } else if (acc=== 4 && idx === 4 && cur[1] === 'empty'){
              opened3++
            }
            return acc
          }, 0)
        }

        console.log(opened3)
        if(opened3 === 2) {
          alert('금수입니다.')
        }else{
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
        }
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