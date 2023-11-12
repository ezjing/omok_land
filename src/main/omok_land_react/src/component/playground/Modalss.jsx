import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Modalss(props) {
    const [msg, setMsg] = useState("");
    const [chatt, setChatt] = useState([]);
    const [socketData, setSocketData] = useState();
    const [ip, setIp] = useState(props.ip);
    const [ws, setWs] = useState(props.ws);
    const [visible, setVisible] = useState(true);
    const [open, setOpen] = useState(false);

    const navi = useNavigate();

    useEffect(() => {
        setChatt(props.chatt);
        setSocketData(props.socketData);

    }, [props.socketData]);

    useEffect(() => {
        if (socketData !== undefined) {

            const tempData = chatt.concat(socketData);
            // console.log(tempData);
            setChatt(tempData);
        }
    }, [socketData]);

    // 재경기 요청
    const reGame = () => {

        const data = {
            name: props.name,
            topic: 'apply',
            msg: 'regame',
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
            name: props.name,
            topic: 'answer',
            msg: ip,
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
        window.location.reload();
        navi(`/playground/111`);

    }

    // 재경기 거절
    const reject = () => {
        const data = {
            name: props.name,
            topic: 'answer',
            msg: 'reject',
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
                            }}>확인
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else if (item.msg !== 'reject' && item.name !== props.name && visible === true) {
            return (
                <div className="card border-5 border-black" style={{width: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title fs-5 fw-bold">재경기 요청</h5>
                        <span>상대방이 재경기를 수락하였습니다.</span>
                        <div className={'d-flex justify-content-end mt-2'}>
                            <button type={'button'} className="btn btn-primary me-2" onClick={() => {
                                window.location.reload();
                                navi(`/playground/${item.msg}`);
                            }}>확인
                            </button>
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
                            }}>확인
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={'mt-3'}>
            {/*승패 결정 나면 자동 출력되게 바꿔야함*/}
            <Button variant="contained" onClick={handleClickOpen}>
                모달 출력
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Stack spacing={5} direction={'row'} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingY: 2,
                        }}>
                            <img src="/img/main/blackStone.png" alt="" className={'w-25 h-25'}/>
                            <Typography variant="h1" color={'primary'}><h1><b>WIN!!</b></h1></Typography>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={'game-re'} onClick={reGame} variant="contained" color="success">재경기 신청</Button>
                    <Button className={'game-exit'} onClick={gameExit} variant="contained" color="error">대국방 퇴장</Button>
                </DialogActions>
                <div id={'regame-modal'}>
                    {regameModal}
                    {regameResult}
                    {gameInOut}
                </div>
            </Dialog>
        </div>
    )
}

export default Modalss;