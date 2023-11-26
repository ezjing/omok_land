import {
  Box, Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  ThemeProvider,
  Typography
} from "@mui/material";
import Timer from "./Timer";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DraftsIcon from "@mui/icons-material/Drafts";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Modal(props) {
  const [play, setPlay] = useState(false);    // 기본값 false로 바꾸고 경기 시작될때 true 되도록 수정
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState(true);
  const [result2, setResult2] = useState(false);
  const [result3, setResult3] = useState(true);
  const [ws, setWs] = useState(props.ws);
  const navi = useNavigate();

  useEffect(() => {
    // console.log(props.chatt);
    console.log(props.socketData);
    const item = props.socketData;
    if (item !== undefined) {
      if (item.topic === 'apply' && item.name !== props.name) {
        setResult2(true);
      }
      // if (item.topic === 'answer' && item.name !== props.name) {
      //   setResult(false);
      // }

    }
  }, [props.chatt])
  const handleSurrender = () => {
    setVisible(true);
  };



  // 정말 항복하시겠습니까? => 네
  const surrenYes = () => {
    const data = {
      color: props.color,
      topic: 'surren',
      msg: 'yes',
      date: new Date().toLocaleString(),
    }

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) { //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }

    setVisible(false);
    setResult(true);

  }

  // 승자 확인 버튼 => 모달창 사라지게 하기
  const winnerYes = () => {
    setResult(false);
  }

  // 승패 결정 후 나가기 버튼
  const exit = () => {
    const data = {
      name: props.name,
      topic: 'exit',
      msg: 'exit',
      date: new Date().toLocaleString(),
    }

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) {
      ws.current.onopen = () => {
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }

    navi('/main');

  }

  // 패자 재경기 요청 버튼
  const reGame = () => {
    axios.get(`http://localhost:8080/server/getIp`) // ip 호출 axios
    .then(res => {
      console.log(res.data);
      const data = {
        name: props.name,
        topic: 'apply',
        msg: 'regame',
        ip: res.data,
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
      setResult(false);
    })
    .catch(err => {
      alert(`통신 실패`);
    });
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
    }
    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) {
      ws.current.onopen = () => {
        console.log(ws.current.readyState);
        ws.current.send(temp);
      }
    } else {
      ws.current.send(temp);
    }
    navi('/main');
  }

  return (
    <div>
      <Stack spacing={2} direction={'row'} sx={{marginY: 2, display: 'flex', justifyContent: 'space-between', width: '80%'}}>
        <Timer theme={theme}></Timer>
        <Box>
          <ThemeProvider theme={theme}>
            <AudiotrackIcon sx={{alignSelf: 'center'}} color={'bluegray'}></AudiotrackIcon>
            {play ?
              <IconButton sx={{opacity: '50%'}} color={'bluegray'} onClick={handlePause}><PauseIcon/></IconButton> :
              <IconButton sx={{opacity: '50%'}} color={'bluegray'} onClick={handlePlay}><PlayArrowIcon/></IconButton>}
            <audio src="/audio/Hawaii%20Five%20O_Theme%20Song.mp3" id={'myAudio'} loop hidden></audio>
          </ThemeProvider>
        </Box>
        <Box>
          <ThemeProvider theme={theme}>
            <IconButton color={'bluegray'} onClick={handleInvite}><DraftsIcon/></IconButton>
            <IconButton color={'bluegray'} onClick={handleShare}><ShareIcon/></IconButton>
            <IconButton color={'bluegray'} onClick={handleSurrender}><FlagIcon/></IconButton>
          </ThemeProvider>
        </Box>
      </Stack>

      {/*항복 여부 창*/}

      <Dialog open={visible} onClose={() => setVisible(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack spacing={5} direction={'row'} sx={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: 2,
            }}>
              {/*<img src="/img/main/blackStone.png" alt="" className={'w-25 h-25'}/>*/}
              <Typography variant="h3" color={'black'}><h1><b>정말 항복하시겠습니까?</b></h1></Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={'game-re'} variant="contained" color="success"
                  onClick={surrenYes}>
            네
          </Button>
          <Button className={'game-exit'} variant="contained" color="error"
                  onClick={() => setVisible(false)}>아니오</Button>
        </DialogActions>
      </Dialog>

      {/*  항복 결과 창*/}
      {
        props.chatt
        .filter(item => item.topic === 'surren')
        .map((item, idx) => (
          item.color === props.color ?
            // 패배자 화면
            <div key={idx}>
              <Dialog open={result} onClose={() => setResult(false)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack spacing={5} direction={'row'} sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingY: 2,
                    }}>
                      <img src={props.color === 'black' ? "/img/main/blackStone.png" : "/img/main/whiteStone.png"} alt="" className={'w-25 h-25'}/>
                      <Typography variant="h3" color={'red'}><h1><b>YOU LOSE</b></h1></Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={'game-re'} variant="contained" color="success"
                          onClick={reGame}>재경기 요청</Button>
                  <Button className={'game-exit'} variant="contained" color="error"
                          onClick={exit}>나가기</Button>
                </DialogActions>
              </Dialog>
            </div>
            :
            // 승자 화면
            <div key={idx}>
              <Dialog open={result} onClose={() => setResult(false)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack spacing={5} direction={'row'} sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingY: 2,
                    }}>
                      <img src={props.color === 'black' ? "/img/main/blackStone.png" : "/img/main/whiteStone.png"} alt="" className={'w-25 h-25'}/>
                      <Typography variant="h3" color={'blue'}><h1><b>YOU WIN !!</b></h1></Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={'game-re'} variant="contained" color="success"
                          onClick={winnerYes}>확인</Button>
                  <Button className={'game-exit'} variant="contained" color="error"
                          onClick={exit}>나가기</Button>
                </DialogActions>
              </Dialog>
            </div>
        ))
      }
      {/*  경기 종료 후 상대방이 나가기 누른 경우*/}
      {
        props.chatt
        .filter(item => item.topic === 'exit')
        .map((item, idx) => (
          item.msg === 'exit' && item.name != props.name ?
            <div key={idx}>
              <Dialog open={result} onClose={() => setResult(false)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack spacing={5} direction={'row'} sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingY: 2,
                    }}>
                      <Typography variant="h3" color={'black'}><h1><span className={'text-primary'}>{item.name}</span>님이 대국방을 나갔습니다. </h1></Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={'game-re'} variant="contained" color="success"
                          onClick={() => setResult(false)}>확인</Button>
                </DialogActions>
              </Dialog>
            </div>
            :
            null
        ))
      }
      {/*  재경기 요청 창(상대에게)*/}
      {
        props.chatt
        .filter(item => item.topic === 'apply')
        .map((item, idx) => (
          item.msg === 'regame' && item.name !== props.name ?
            <div key={idx}>
              <Dialog open={result2} onClose={() => setResult2(false)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack spacing={5} direction={'row'} sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingY: 2,
                    }}>
                      <Typography variant="h3" color={'black'}><h1><b><span className={'text-primary'}>{item.name}</span>님이 재경기를 신청하였습니다. <br/><br/>수락하시겠습니까?</b></h1></Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={'game-re'} variant="contained" color="success"
                          onClick={accept}>수락</Button>
                  <Button className={'game-exit'} variant="contained" color="error"
                          onClick={reject}>거절</Button>
                </DialogActions>
              </Dialog>
            </div>
            :
            null
        ))
      }
      {/*재경기 요청 결과 창*/}
      {
        props.chatt.
        filter(item => item.topic === 'answer')
        .map((item, idx) => (
          // 상대방 재경기 수락
          item.msg === 'yes' && item.name !== props.name && idx === 0 ?
            <div key={idx}>
              <Dialog open={result3} onClose={() => setResult3(false)}>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Stack spacing={5} direction={'row'} sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingY: 2,
                    }}>
                      <Typography variant="h3" color={'black'}><h1><b><span className={'text-primary'}>{item.name}</span>님이 재경기를 수락하였습니다.</b></h1></Typography>
                    </Stack>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button className={'game-re'} variant="contained" color="success"
                          onClick={() => {
                            navi(`/playground/${item.ip}`);
                            window.location.reload();
                          }}>확인</Button>
                </DialogActions>
              </Dialog>
            </div>
            // 상대방 재경기 거절
            : item.msg === 'no' && item.name !== props.name && idx === 0 ?
              <div key={idx}>
                <Dialog open={result3} onClose={() => setResult3(false)}>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <Stack spacing={5} direction={'row'} sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingY: 2,
                      }}>
                        <Typography variant="h3" color={'black'}><h1><b><span className={'text-primary'}>{item.name}</span>님이 재경기를 거절하였습니다.</b></h1></Typography>
                      </Stack>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button className={'game-re'} variant="contained" color="success"
                            onClick={() => {
                              setResult3(false)}}>확인</Button>
                  </DialogActions>
                </Dialog>
              </div>
              :
              null
        ))
      }
    </div>
  )
}

export default Modal;