import React, {useState} from 'react';
import {Grid} from "@mui/material";
import './pan.css';
import './omok.css';


function Pan() {

    const clickHandler = (row, col) => {
        alert(`클릭 ${row} : ${col}`)
    }

    return (
        <div className={'mx-auto my-5'} style={{width : '80%'}}>
            <div className="omok-board">
                {/*기본 19칸 15칸으로 변경하면 css도 바꿔줘야함*/}
                {Array.from({length: 19}, (_, rowIndex) => (
                    <div key={rowIndex}>
                        {Array.from({length: 19}, (_, colIndex) => (
                            <div style={{cursor : 'pointer'}} key={colIndex} onClick={() => {clickHandler(rowIndex, colIndex)}}>
                                <div className="cross-container">
                                    <hr className="horizontal-line my-0"/>
                                    <hr className="vertical-line my-0"/>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pan;
