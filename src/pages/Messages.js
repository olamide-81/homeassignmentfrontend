import React from 'react'
import { Card } from 'reactstrap'
import Header from '../components/header'
import Messagecard from '../components/Messagecard'
import '../css/login.css'

function Messages() {
  return (
    <div className='home'>
         <Header/>
         <Messagecard/>
          
    </div>
  )
}

export default Messages