import React, {useState} from "react";
import {Box, createTheme, IconButton, Stack, ThemeProvider} from "@mui/material";
import Timer from "../main/Timer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import DraftsIcon from '@mui/icons-material/Drafts';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';

function Tool(props) {
    const [play, setPlay] = useState(false);    // 기본값 false로 바꾸고 경기 시작될때 true 되도록 수정

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF5733',
            },
            bluegray: {
                main: '#eceff1',
            },
        },
    });

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

    const handleInvite = () => {
        let url = '';
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("대국방 주소가 복사되었습니다.");
    };

    const handleShare = () => {
        let url = '';
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        const pos1 = url.indexOf('playground');
        url = url.substring(0, pos1);
        url = url.concat('main');
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert('홈페이지 주소가 복사되었습니다.');
    };

    const handleSurrender = () => {
        alert('항복하시겠습니까?'); // 모달로하기
        // if () {
        //     승리 모달
        // }
        // else {
        //     재경기 모달 닫기
        // }
    };

    return (
        <Stack spacing={2} direction={'row'}
               sx={{marginY: 2, display: 'flex', justifyContent: 'space-between', width: '80%'}}>
            <Timer theme={theme}></Timer>
            <Box>
                <ThemeProvider theme={theme}>
                    <AudiotrackIcon sx={{alignSelf: 'center'}} color={'bluegray'}></AudiotrackIcon>
                    {play ? <IconButton sx={{opacity: '50%'}} color={'bluegray'}
                                        onClick={handlePause}><PauseIcon/></IconButton> :
                        <IconButton sx={{opacity: '50%'}} color={'bluegray'}
                                    onClick={handlePlay}><PlayArrowIcon/></IconButton>}
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
    )
}

export default Tool;