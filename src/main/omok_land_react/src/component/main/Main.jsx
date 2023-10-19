import * as React from 'react';
import {Box, Link} from "@mui/material";
import Banner from "./Banner";
import {useEffect, useState} from "react";
import axios from "axios";
import {Outlet} from "react-router-dom";

function Main(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

// 화면 크기가 변경될 때마다 windowWidth 상태 업데이트
    useEffect(() => {
        // axios.get(`http://localhost:8080/server/getIp`) // ip 호출 axios
        //     .then(res => {
        //         console.log(res.data);
        //         setIp(res.data);
        //     })
        //     .catch(err => {
        //         alert(`통신 실패`);
        //     });

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Box sx={{
            background: 'url("/img/main/omok.jpg") no-repeat center',
            height: '100vh',
            backgroundSize: 'cover',
        }}>
            {/*<Grid container spacing={0} sx={{placeItem: 'center'}}>*/}
            {/*    <Grid xs={3}>*/}

            {/*    </Grid>*/}
            {/*    <Grid xs={6} sx={{marginTop: '2em'}}>*/}
            {/*        <img src="/img/main/logo.png" alt="" style={{width: '90%'}}/>  /!* 제일 먼저오는 /는 루트를 나타냄, 루트는 public *!/*/}
            {/*    </Grid>*/}
            {/*    <Grid xs={3}>*/}

            {/*    </Grid>*/}
            {/*</Grid>*/}
            <Box display="flex" alignItems="center" justifyContent="center" height={'100%'} marginBorder={'12em'}>  {/* 이렇게 표현해도 되고 sx안에 넣어 정리해도 됨 */}
                {windowWidth >= 960
                    ?
                        <Link href={`#`} className={'d-flex align-items-center'}>
                            <img src="/img/main/logo.png" className={'mx-auto'} alt="" style={{width: '40%', marginBottom: '17em'}}/>
                        </Link>
                    :
                        <Link href={`#`}>
                            <img src="/img/main/logo.png" className={'mx-auto'}  alt="" style={{width: '80%', marginBottom: '25em'}}/>
                        </Link>
                }
            </Box>
            <Banner/>
        </Box>
    )
}

export default Main;