import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'




export default function({name, numberOfUsers}) {

  const changeColor = (event) => {
    const elem = document.querySelector('#side-bar .heading');
    const elem2 = document.querySelector('#side-bar .search');
    const elem3 = document.querySelector('#side-bar .users');
    const elem4 = document.querySelector('#side-bar .user');
    const elem5 = document.querySelector('#side-bar .current-user');
    const elem6 = document.querySelector('.chat-header');
    const elem7 = document.querySelector('.thread-container .thread');
    const elem8 = document.querySelector('.message-input');
    const elem9 = document.querySelector('.callout');
    const elem10 = document.querySelector('#root');







    if (elem && elem.classList.contains('ghost') && elem2.classList.contains('searchColor') && elem3.classList.contains('usersColor') && elem4.classList.contains('activeColor') && elem5.classList.contains('current') && elem6.classList.contains('header') && elem7.classList.contains('thread-body') && elem8.classList.contains('footer') && elem9.classList.contains('left_postcomment')&& elem10.classList.contains('background_color')) {
      elem.classList.remove('ghost')
      elem2.classList.remove('searchColor')
      elem3.classList.remove('usersColor')
      elem4.classList.remove('activeColor')
      elem5.classList.remove('current')
      elem6.classList.remove('header')
      elem7.classList.remove('thread-body')
      elem8.classList.remove('footer')
      elem9.classList.remove('left_postcomment')
      elem10.classList.remove('background_color')

    } else {
      elem.classList.add('ghost');
      elem2.classList.add('searchColor')
      elem3.classList.add('usersColor')
      elem4.classList.add('activeColor')
      elem5.classList.add('current')
      elem6.classList.add('header')
      elem7.classList.add('thread-body')
      elem8.classList.add('footer')
      elem9.classList.add('left_postcomment')
      elem10.classList.add('background_color')

    }
  }

    return (
      <div className="chat-header">
        <div className="user-info">
          <div className="user-name">{name}</div>
          <div className="status">
            <div className="indicator"></div>
            <span>{numberOfUsers ? numberOfUsers : null}</span>
          </div>
        </div>
        <div className="options">
          <label className="switch" >
            <input type="checkbox"/>
            <span className="slider round" onClick={changeColor}></span>
</label>
        </div>
      </div>

    );

}