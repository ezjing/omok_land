import React, {useState} from 'react';
import {Grid} from "@mui/material";
import '../../static/css/pan.css';
import '../../static/css/omok.css';
import '../../static/css/box.css';


function Pan(props) {

    const clickHandler = (row, col) => {
      props.coordinate(`${row}, ${col}`)
    }
    return (
        // <div className={'mx-auto my-5'} style={{ height : '100%'}}>
        //     <div className={"omok-board box"}>
        //         {/*기본 19칸 15칸으로 변경하면 css도 바꿔줘야함*/}
        //         {Array.from({length: 19}, (_, rowIndex) => (
        //             <div key={rowIndex}>
        //                 {Array.from({length: 19}, (_, colIndex) => (
        //                     <div style={{cursor : 'pointer', height : '100%'}} key={colIndex} onClick={() => {clickHandler(rowIndex, colIndex)}}>
        //                         <div className="cross-container">
        //                             <hr className="horizontal-line my-0"/>
        //                             <hr className="vertical-line my-0"/>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         ))}
        //     </div>
        // </div>
  <div className={'mx-auto my-5'} style={{ height : '100%'}}>
    <div className={"omok-board box"}>
      {/*기본 19칸 15칸으로 변경하면 css도 바꿔줘야함*/}
      {Array.from({length: 15}, (_, rowIndex) => (
        <div key={rowIndex}>
          {Array.from({length: 15}, (_, colIndex) => (
            <div style={{cursor : 'pointer', height : '100%'}} key={colIndex} onClick={() => {clickHandler(rowIndex, colIndex)}}>
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
