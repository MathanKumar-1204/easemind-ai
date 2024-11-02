import React from 'react'
import Menu from './Menu'
import Main from './Main'
import './menu.css'


export default function Menupage() {
  return (
    <>
    <video autoPlay loop muted id="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div className='menubar'>
        <Menu/>
    </div>
    <div className='main'>
        <Main/>
    </div></>
  )
}
