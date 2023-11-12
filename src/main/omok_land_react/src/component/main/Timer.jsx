import React, {useEffect, useState} from "react";
import {Box, Button, IconButton, Stack, ThemeProvider} from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';

function Timer(props) {
    const [time, setTime] = useState({ seconds: 60, milliseconds: 0 }); // milliseconds는 소수점 첫번째 자리까지 해당
    const [running, setRunning] = useState(false);

    const theme = props.theme;

    // 타이머 10/1000초마다 실행
    const interval = setInterval(timer, 10);

    // 타이머 로직
    function timer() {
        if (running) {
            // 0초일때 카운트다운 중지
            if (time.seconds === 0 && time.milliseconds === 0) {
                clearInterval(interval);    // clearInterval() : (변수)반복 중단

                document.getElementById("") // 카운트다운 끝나면 출력할 패배 모달
                return;
            }

            // 밀리초 -1
            let updatedMilliseconds = time.milliseconds - 1;
            let updatedSeconds = time.seconds;

            // 밀리세컨드가 0이하가 되면
            if (updatedMilliseconds < 0) {
                updatedMilliseconds = 99;
                updatedSeconds -= 1;
            }

            if (updatedSeconds < 10) {  // 10초 미만인 경우 글자색 변경
                document.getElementById('text-color').style.color = 'red';
            }
            else {
                document.getElementById('text-color').style.color = 'white';
            }

            setTime({seconds: updatedSeconds, milliseconds: updatedMilliseconds});

            // console.log(updatedSeconds + ':' + updatedMilliseconds);
            clearInterval(interval);    // 마지막에 반복 중단이 있어야 카운트가 60초로 초기화 안되는듯..
        }
    }
    
    // 돌 놓을때 마다 타이머 초기화 (유즈이펙트 위치 변경 X 타이머 로직 아래에 있을때 에러나는 경우가 가장 적었음)
    useEffect(() => {
        // console.log('WebSocket 데이터:', props.chatt);
        if ( props.chatt.length > 0 && props.chatt[props.chatt.length-1].topic == 'game') { // 웹소켓 길이가 있으면 + 웹소캣 마지막 통신이 game인 경우
            clearInterval(interval);
            setTime({seconds: 60, milliseconds: 0});
            setRunning(true);
            // console.log("웹소켓 길이 : " + props.chatt.length);
            // console.log(props.chatt[props.chatt.length-1]);
        }
    }, [props.chatt])
    
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ThemeProvider theme={theme}>
                <TimerIcon sx={{margin: 1}} color={'bluegray'}/>

                <p id={'text-color'} style={{color: 'white'}}>
                    {time.seconds}:
                    {time.milliseconds < 10 ? "0" : ""}{/* 10보다 작아지면 0을 출력하며 자릿수를 채워주는 역할을 함. 09, 08, 07 ... 이런식으로 출력 되게끔 */}
                    {time.milliseconds}{/* 실질적으로 milliseconds를 출력하는 부분 */}
                </p>
            </ThemeProvider>
        </Box>
    );
}

export default Timer;