import React from 'react';
import '../../static/css/profile.css';


function Profile(props) {
  
  return (
    <div>
      <div id={'profile'} className={'my-5'}>
        <img src={process.env.PUBLIC_URL + '/img/main/orc.jpg'} alt="이미지 경로를 찾을 수 없습니다." className={'pro-me'}/>
        <img src={process.env.PUBLIC_URL + '/img/main/versus.jpg'} alt="이미지 경로를 찾을 수 없습니다." className={'versus'}/>
        <img src={process.env.PUBLIC_URL + '/img/main/human.jpg'} alt="이미지 경로를 찾을 수 없습니다." className={'pro-you'}/>
      </div>

    </div>
    
  )
}

export default Profile;