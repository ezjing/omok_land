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

    useEffect(() => {
        let interval;

        if (time.seconds === 60) {
            document.getElementById('text-color').style.color = 'black';
        }

        if (running) {
            // setTimeout() : 어떤 코드를 바로 실행하지 않고 일정 시간 기다린 후 실행해야하는 경우
            // setInterval() : 웹페이지의 특정 부분을 주기적으로 업데이트해줘야 하거나, 어떤 API로 부터 변경된 데이터를 주기적으로 받아와야 하는 경우
            interval = setInterval(() => {
                if (time.seconds === 0 && time.milliseconds === 0) {
                    clearInterval(interval);    // clearInterval() : (변수)반복 중단
                    setRunning(false);
                    return;
                }

                let updatedMilliseconds = time.milliseconds - 1;
                let updatedSeconds = time.seconds;

                if (updatedMilliseconds < 0) {
                    updatedMilliseconds = 99;
                    updatedSeconds -= 1;
                }

                if (updatedSeconds < 10) {  // 10초 미만인 경우 글자색 변경
                    document.getElementById('text-color').style.color = 'red';
                }

                setTime({ seconds: updatedSeconds, milliseconds: updatedMilliseconds });
            }, 10);    // 100/1000 초마다 실행됨
        }

        return () => clearInterval(interval);
    }, [running, time]);

    const startTimer = () => {
        if (!running) {
            setTime({ seconds: 60, milliseconds: 0 });
            setRunning(true);
        }
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ThemeProvider theme={theme}>
                <TimerIcon sx={{margin: 1}} color={'bluegray'}/>

                <p id={'text-color'} className={'text-white'}>
                    {time.seconds}:
                    {time.milliseconds < 10 ? "0" : ""}{/* 10보다 작아지면 0을 출력하며 자릿수를 채워주는 역할을 함. 09, 08, 07 ... 이런식으로 출력 되게끔 */}
                    {time.milliseconds}{/* 실질적으로 milliseconds를 출력하는 부분 */}
                </p>
            </ThemeProvider>
        </Box>
    );
}

export default Timer;