import React, {useState} from "react";
import {Box, IconButton, Popover, Stack, Tooltip, Typography} from "@mui/material";
import Timer from "../main/Timer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LogoutIcon from '@mui/icons-material/Logout';
import LoopIcon from '@mui/icons-material/Loop';

function Tool(props) {
    const [play, setPlay] = useState(false);    // 기본값 false로 바꾸고 경기 시작될때 true 되도록 수정

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
        <Stack spacing={2} direction={'row'} sx={{marginY: 2, display: 'flex', justifyContent: 'space-between', width: '80%'}}>
            <Timer></Timer>
            <Box>
                <AudiotrackIcon sx={{alignSelf: 'center'}}></AudiotrackIcon>
                {play ? <IconButton onClick={handlePause}><PauseIcon/></IconButton> : <IconButton onClick={handlePlay}><PlayArrowIcon/></IconButton>}
                <audio src="/audio/Hawaii%20Five%20O_Theme%20Song.mp3" id={'myAudio'} loop hidden></audio>
            </Box>
            <Box>
                <Tooltip title={'재도전'} arrow>
                    <IconButton><LoopIcon/></IconButton>
                </Tooltip>
                <Tooltip title={'나가기'} arrow>
                    <IconButton><LogoutIcon/></IconButton>
                </Tooltip>
            </Box>
        </Stack>
    )
}

export default Tool;