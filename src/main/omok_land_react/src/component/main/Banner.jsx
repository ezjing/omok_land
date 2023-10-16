import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Banner(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

// 화면 크기가 변경될 때마다 windowWidth 상태 업데이트
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const navigate = useNavigate();

    const goTimer = () => navigate('/timer');

    return (
        <Box
            sx={
                windowWidth >= 960
                    ? {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        border: '20px solid transparent',
                        borderImage: 'url("/img/main/human-border.png") 50 round',
                    }
                    : {
                        position: "fixed",
                        bottom: 0,
                        marginY: 10,
                        marginX: 5,
                        textAlign: "center",
                        border: '20px solid transparent',
                        borderImage: 'url("/img/main/human-border.png") 50 round',
                    }
            }
        >   {/* Box는 mui에서 div 대신 사용하는 것, sx 는 inline-style 대신 사용하는 것 */}

                {/*<Box sx={{*/}

                {/*    // position: "fixed",*/}
                {/*    // bottom: 0,*/}
                {/*    // left: 0,*/}
                {/*    // right: 0,*/}
                {/*    display: 'flex',*/}
                {/*    alignItems: 'center',*/}
                {/*    justifyContent: 'center',*/}
                {/*    height: '100%',*/}
                {/*    marginBottom: '2em',*/}
                {/*    textAlign: "center",*/}
                {/*    border: '20px solid transparent',*/}
                {/*    borderImage: 'url("/img/main/human-border.png") 50 round',*/}
                {/*}}>*/}
            <Grid container spacing={0} sx={{
                bgcolor: 'black',
            }}>
                <Grid xs={0} md={4}>
                    {windowWidth >= 960 && (
                        <img src="/img/main/orc.jpg" alt="" style={{width: '100%', float: 'left', verticalAlign: 'middle'}} />
                    )}
                </Grid>
                <Grid xs={12} md={4}>
                    <Button sx={{width: '100%', height: '100%'}} onClick={goTimer}>
                        <Box>
                            <Typography variant="h4" sx={{marginY: '0.5em'}}>
                                막고라를 신청하세요
                            </Typography>
                            <h1>게임 입장</h1>
                        </Box>
                    </Button>
                </Grid>
                <Grid xs={0} md={4}>
                    {windowWidth >= 960 && (
                        <img src="/img/main/human.jpg" alt="" style={{width: '100%', float: 'right', verticalAlign: 'middle'}}/>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Banner;