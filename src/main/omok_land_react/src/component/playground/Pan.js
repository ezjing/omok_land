import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import '../../static/css/pan.css';
import '../../static/css/omok.css';
import '../../static/css/box.css';


function Pan(props) {

  const [lastColor, setLastColor] = useState('')
  const clickHandler = (row, col) => {
    // 좌표 전달하기 전에 빈값인지 확인
    if(props.gameArr.filter(item => item.coordinate === `${row}, ${col}`).length > 0) {
      alert('이미 놓아진 곳에는 둘 수 없습니다.')
    }else if(lastColor === props.color){
      alert('상대의 차례입니다.')
    }
    else{
      props.coordinate(`${row}, ${col}`)
    }
  }

  useEffect(() => {
    // 마지막 색깔 추출해서 스테이트 저장
    if(props.gameArr.length > 0) {

      setLastColor(props.gameArr[props.gameArr.length - 1].color)

    }

  }, [props.gameArr]);

  useEffect(() => {

  }, [lastColor]);

  return (
    <div className={'mx-auto my-3'} style={{height: '100%'}}>
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
                    <div id={`${rowIndex}:${colIndex}`} className={
                      props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`).length > 0
                        ? `active-${props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`)[0].color}`
                        :
                        props.gaming && ((props.gameArr.length === 0 && props.color === 'black') || (lastColor === 'white' && props.color === 'black')) ? "hover-black"
                          : props.gaming && lastColor === 'black' && props.color === 'white' ? "hover-white" : ""
                    }>
                    </div>
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
                      <div className={
                        props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`).length > 0
                          ? `active-${props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`)[0].color}`
                          :
                          props.gaming && ((props.gameArr.length === 0 && props.color === 'black') || (lastColor === 'white' && props.color === 'black')) ? "hover-black"
                              : props.gaming && lastColor === 'black' && props.color === 'white' ? "hover-white" : ""
                      }></div>
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
                          <div className={
                              props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`).length > 0
                                  ? `active-${props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`)[0].color}`
                                  :
                                  props.gaming && ((props.gameArr.length === 0 && props.color === 'black') || (lastColor === 'white' && props.color === 'black')) ? "hover-black"
                                      : props.gaming && lastColor === 'black' && props.color === 'white' ? "hover-white" : ""
                          }></div>
                        <hr className="horizontal-line my-0"
                            style={{width: '50%', left: '50%'}}/>
                        <hr className="vertical-line my-0"/>

                      </div>
                      :
                      // 오른쪽
                      rowIndex === 14 ?
                        <div className="cross-container">
                            <div className={
                                props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`).length > 0
                                    ? `active-${props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`)[0].color}`
                                    :
                                    props.gaming && ((props.gameArr.length === 0 && props.color === 'black') || (lastColor === 'white' && props.color === 'black')) ? "hover-black"
                                        : props.gaming && lastColor === 'black' && props.color === 'white' ? "hover-white" : ""
                            }></div>
                          <hr className="horizontal-line my-0" style={{width: '50%'}}/>
                          <hr className="vertical-line my-0"/>

                        </div>
                        // 나머지
                        :
                        <div className="cross-container">
                            <div className={
                                props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`).length > 0
                                    ? `active-${props.gameArr.filter(item => item.coordinate === `${rowIndex}, ${colIndex}`)[0].color}`
                                    :
                                    props.gaming && ((props.gameArr.length === 0 && props.color === 'black') || (lastColor === 'white' && props.color === 'black')) ? "hover-black"
                                        : props.gaming && lastColor === 'black' && props.color === 'white' ? "hover-white" : ""
                            }></div>
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
