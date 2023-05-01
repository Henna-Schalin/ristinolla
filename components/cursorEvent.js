import React, { useState, useEffect } from 'react'
import cursorImg from '../img/feather.svg'

const CursorEvent = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }) // initialize cursor position to (0,0)

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY }) // update cursor position on mouse move
    }
    window.addEventListener('mousemove', handleMouseMove) // add event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove) // remove event listener on component unmount
    }
  }, []) 


  const cursorStyle = {
    position: 'fixed',
    top: cursorPosition.y - 320,
    left: cursorPosition.x + 5,
    zIndex: 9999,
    PointerEvent: 'none'
  }


  return (
    <div style={cursorStyle}>
      <img src={cursorImg} className="cursorImg" alt="cursor" sx={{ height: '350px', width: '350px' }} />
    </div>
  )
}

export default CursorEvent