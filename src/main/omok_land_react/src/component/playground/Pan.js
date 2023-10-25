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
    <div className={'mx-auto my-5'} style={{height: '100%'}}>
      <div className={"omok-board box"}>
        {/*기본 19칸 15칸으로 변경하면 css도 바꿔줘야함*/}
        {Array.from({length: 15}, (_, rowIndex) => (
          <div key={rowIndex}>
            {Array.from({length: 15}, (_, colIndex) => (
              <div style={{cursor: 'pointer', height: '100%'}} key={colIndex} onClick={() => {
                clickHandler(rowIndex, colIndex)
              }}>
                {/* 선 삐져나오는건 width, height % 조정 */}
                {/* 위쪽 */}
                {colIndex === 0 ?
                  <div className="cross-container">
                    <div className={props.gaming ? "hover" : "" }  ></div>
                    <hr className="horizontal-line my-0" style={rowIndex === 0 ? {
                      width: '50%',
                      left: '50%'
                    } : rowIndex === 14 ? {width: '50%'} : {}}/>
                    <hr className="vertical-line my-0" style={{height: '50%', top: '50%'}}/>

                  </div>
                  :
                  // 아래쪽
                  colIndex === 14 ?
                    <div className="cross-container">
                      <div className={props.gaming ? "hover" : "" }></div>
                      <hr className="horizontal-line my-0" style={rowIndex === 0 ? {
                        width: '50%',
                        left: '50%'
                      } : rowIndex === 14 ? {width: '55%'} : {}}/>
                      <hr className="vertical-line my-0" style={{height: '50%'}}/>

                    </div>
                    :
                    // 왼쪽
                    rowIndex === 0 ?
                      <div className="cross-container">
                        <div className={props.gaming ? "hover" : "" }></div>
                        <hr className="horizontal-line my-0"
                            style={{width: '50%', left: '50%'}}/>
                        <hr className="vertical-line my-0"/>

                      </div>
                      :
                      // 오른쪽
                      rowIndex === 14 ?
                        <div className="cross-container">
                          <div className={props.gaming ? "hover" : "" }></div>
                          <hr className="horizontal-line my-0" style={{width: '50%'}}/>
                          <hr className="vertical-line my-0"/>

                        </div>
                        // 나머지
                        :
                        <div className="cross-container">
                          <div className={props.gaming ? "hover" : "" }></div>
                          <hr className="horizontal-line my-0"/>
                          <hr className="vertical-line my-0"/>

                        </div>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pan;
