import React, {useState} from 'react';
import {Grid, Paper} from "@mui/material";
import './omok.css';


const Omok = () => {

    // const [board, setBoard] = useState(Array(15).fill(Array(15).fill(null)));
    // const [player, setPlayer] = useState('X');
    //
    // const handleClick = (row, col) => {
    //     if (!board[row][col]) {
    //         const newBoard = board.map((r) => [...r]);
    //         newBoard[row][col] = player;
    //         setBoard(newBoard);
    //         setPlayer(player === 'X' ? 'O' : 'X');
    //     }
    // };

    return(
        <div>
            <div className="omok-board">
                {/* 오목선 그리기 */}
                {Array.from({ length: 19 }, (_, rowIndex) => (
                    <div key={rowIndex} className={`omok-line ${rowIndex === 9 ? 'center-dot' : ''}`}>
                        {Array.from({ length: 19 }, (_, colIndex) => (
                            <div key={colIndex} className={`${colIndex === 9 ? 'center-dot' : ''}`}></div>
                        ))}
                    </div>
                ))}
            </div>
            {/*<Grid>*/}
            {/*    {board.map((row, rowIndex) => (*/}
            {/*        <Grid container item key={rowIndex}>*/}
            {/*            {row.map((cell, colIndex) => (*/}
            {/*                <Grid item key={colIndex}>*/}
            {/*                    <Paper*/}
            {/*                        onClick={() => handleClick(rowIndex, colIndex)}*/}
            {/*                        style={{*/}
            {/*                            width: '50px',*/}
            {/*                            height: '50px',*/}
            {/*                            display: 'flex',*/}
            {/*                            alignItems: 'center',*/}
            {/*                            justifyContent: 'center',*/}
            {/*                            cursor: 'pointer',*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        {cell}*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            ))}*/}
            {/*        </Grid>*/}
            {/*    ))}*/}
            {/*</Grid>*/}
            {/*<p>Player: {player}</p>*/}
        </div>
    )
};

export default Omok;