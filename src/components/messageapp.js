import React, { useState, useEffect } from 'react'
import { User } from 'react-feather'
import axios from 'axios'
import { Button, Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
Label,Card, CardImg, CardText, Col, } from 'reactstrap'
import '../css/message.css'
import { Bell } from 'react-feather'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, Navigate } from 'react-router-dom'
import getMessage from '../redux/messageservice'
import { toast } from 'react-toastify'


function Messageapp() {
  const navigate = useNavigate()
    const saved = JSON.parse(localStorage.getItem('user'))
    if(!saved){
      window.location = '/login';
    }
    const name = saved.name
    const token = saved.token 
    const [messagesnum, setMessagesnum] = useState('')
    const [groupno, setGroup] = useState('')
    const [data, setData] = useState([])

    const message = () => {
        navigate('/messages')
    }
  
    useEffect(() => {
      fetch('https://homeassignmentapi.herokuapp.com/api/message', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        })
      .then(res => res.json())
      .then(setData)
    }, [])


 let e = 0
 data.forEach( v => {
   e += !v.isRead ? 1 : 0;
 })

  const { length } = data
   
  return (
    <div className='container'>
        <h4>Welcome Back {name ? name : <Navigate to='/login'></Navigate>}</h4>
        <br/>
        <div>
         <Bell size={25} className='icon'/>
         <Label> You have {e} unread messages out of {length} </Label>
         </div>

        <Button color='primary' onClick={message}> 
            Check Messages
         </Button>
    </div>
  )
}

export default Messageapp