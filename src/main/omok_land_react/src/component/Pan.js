import React, {useState} from 'react';
import {Grid} from "@mui/material";
import './pan.css';


function Pan() {
    return (
        // <div>
        //     <div>
        //         <div className={'d-flex align-items-center'}><hr/></div>
        //         <div className={'box'} style={{display: 'inline'}}>2</div>
        //         <div className={'box'} style={{display: 'inline'}}>3</div>
        //     </div>
        //     <div>
        //         <div className={'box'} style={{display: 'inline'}}>1</div>
        //         <div className={'box'} style={{display: 'inline'}}>2</div>
        //         <div className={'box'} style={{display: 'inline'}}>3</div>
        //     </div>
        //     <div>
        //         <div className={'box'} style={{display: 'inline'}}>1</div>
        //         <div className={'box'} style={{display: 'inline'}}>2</div>
        //         <div className={'box'} style={{display: 'inline'}}>3</div>
        //     </div>
        // </div>


        // <div className={'border border-warning border-2 m-0'} style={{width: '200px', height: '200px'}}>
        //     <hr className={''}/>
        //     {/*<hr className={'text-danger border border-3 border-danger'} style={{lineHeight : '100px'}}/>*/}
        //     {/*<hr className={'text-primary'} style={{transform: 'rotate( 90deg )'}}/>*/}
        // </div>
        <div>
            <div className="cross-container">
                <hr className="horizontal-line my-0"/>
                <hr className="vertical-line my-0"/>
            </div>

        </div>

    );
}

export default Pan;
