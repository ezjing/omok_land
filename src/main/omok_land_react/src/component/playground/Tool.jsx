import React, {useEffect, useState} from "react";
import {Box, IconButton, Popover, Stack, Tooltip, Typography} from "@mui/material";
import Timer from "../main/Timer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LogoutIcon from '@mui/icons-material/Logout';
import LoopIcon from '@mui/icons-material/Loop';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../../static/css/tool.css';

function Tool(props) {
  const [play, setPlay] = useState(false);    // 기본값 false로 바꾸고 경기 시작될때 true 되도록 수정
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

  // 재경기 요청
  const reGame = () => {
    axios.get(`http://localhost:8080/server/getIp`) // ip 호출 axios
    .then(res => {
      console.log(res.data);
      setIp(res.data);
    })
    .catch(err => {
      alert(`통신 실패`);
    });
    const data = {
      name: props.name,
      topic: 'apply',
      msg: 'regame',
      ip: ip,
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)

    const temp = JSON.stringify(data);
    if (ws.current.readyState === 0) {
      ws.current.onopen = () => {
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
  }
  // 재경기 수락
  const accept = () => {
    const data = {
      name: props.name,
      topic: 'answer',
      msg: 'yes',
      ip: props.socketData.ip,
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
    navi(`/playground/${props.socketData.ip}`);
    window.location.reload();
  }

  // 재경기 거절
  const reject = () => {
    const data = {
      name: props.name,
      topic: 'answer',
      msg: 'no',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
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
      name: props.name,
      topic: 'game',
      msg: 'exit',
      date: new Date().toLocaleString(),
    };  //전송 데이터(JSON)

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
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
  const regameModal = props.chatt.filter(item1 => item1.topic === 'apply').map((item, idx) => {
    if (item.msg === 'regame' && item.name !== props.name && idx === 0) {
      return (
        <div className="card border-5 border-black" style={{width: '100%', zIndex: 9999}}>
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
  const regameResult = props.chatt.filter(item1 => item1.topic === 'answer').map((item, idx) => {
    // 상대가 거절한 경우
    if (item.msg === 'no' && item.name !== props.name && visible === true && idx === 0) {
      return (
        <div className="card border-5 border-black" style={{width: '100%', zIndex: 9999}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
            <span>상대방이 재경기를 거절하였습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                setVisible(false);
              }}>확인
              </button>
            </div>
          </div>
        </div>
      )
    }
    // 상대가 수락한 경우
    else if (item.msg === 'yes' && item.name !== props.name && visible === true && idx === 0) {
      return (
        <div className="card border-5 border-black" style={{width: '100%', zIndex: 9999}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
            <span>상대방이 재경기를 수락하였습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                navi(`/playground/${item.ip}`);
                window.location.reload();
              }}>확인
              </button>
            </div>
          </div>
        </div>
      )
    }
  })

  // 대국방 퇴장 알림 창
  const gameInOut = props.chatt.filter(item1 => item1.topic === 'game').map((item, idx) => {
    if (item.msg === 'exit' && item.name !== props.name && visible === true && idx === 0) {
      return (
        <div className="card border-5 border-black" style={{width: '100%', zIndex: 9999}}>
          <div className="card-body">
            <h5 className="card-title fs-5 fw-bold">탈주닌자 발생</h5>
            <span>상대방이 대국방을 나갔습니다.</span>
            <div className={'d-flex justify-content-end mt-2'}>
              <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                setVisible(false);
              }}>확인
              </button>
            </div>
          </div>
        </div>
      )
    }
  })

  const handlePlay = () => {
    const audio = document.getElementById('myAudio');
    audio.play();
    setPlay(true);
  };

  const handlePause = () => {
    const audio = document.getElementById('myAudio');
    audio.pause();
    setPlay(false);
  };

  return (
    <div>
      <Stack spacing={2} direction={'row'}
             sx={{marginY: 2, display: 'flex', justifyContent: 'space-between', width: '80%'}}>
        <Timer></Timer>
        <Box>
          <AudiotrackIcon sx={{alignSelf: 'center'}}></AudiotrackIcon>
          {play ? <IconButton onClick={handlePause}><PauseIcon/></IconButton> :
            <IconButton onClick={handlePlay}><PlayArrowIcon/></IconButton>}
          <audio src="/audio/Hawaii%20Five%20O_Theme%20Song.mp3" id={'myAudio'} loop hidden></audio>
        </Box>
        <Box>
          <Tooltip title={'재도전'} arrow onClick={reGame}>
            <IconButton><LoopIcon/></IconButton>
          </Tooltip>
          <Tooltip title={'나가기'} arrow onClick={gameExit}>
            <IconButton><LogoutIcon/></IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <div id={'reQuit-modal'}>
        {regameModal}
        {regameResult}
        {gameInOut}
      </div>
    </div>
  )
}

export default Tool;