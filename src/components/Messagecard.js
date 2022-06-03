
import React, { useState, useEffect } from 'react'
import { User } from 'react-feather'
import { Button, Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
Label,Card, CardImg, CardText, Col, FormGroup, Form, Input } from 'reactstrap'
import '../css/message.css'
import { Bell } from 'react-feather'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Messagecard() {

  const navigate = useNavigate()

    const saved = JSON.parse(localStorage.getItem('user'))
    const email = saved.email 
    const token = saved.token 
    const [ modalinfo, setModalinfo] = useState('')
    const [formModal, setFormModal] = useState(false)
    const [ subject, setSubject] = useState('')
    const [ content, setContent] = useState('')
    const [ isRead, setisRead] = useState('')

    const [data, setData] = useState([])

    useEffect(() => {
      fetch('https://homeassignmentapi.herokuapp.com/api/message', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        })
      .then(res => res.json())
      .then(setData)
    }, [token])

    useEffect(() => {
      setSubject(data.subject)
      setContent(data.content)
      setisRead(data.isRead)
  }, [data])

    const item = { subject, content, isRead }

    async function update () {
      const result = await fetch(`https://homeassignmentapi.herokuapp.com/api/message/${data[modalinfo]}`, {
        method: 'put',
        body:JSON.stringify(item),
        headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json'
        }
     })
     .then(res => res.json())
       .then(data => {
         alert(data.message)
         setFormModal(false)
       })
    return result
    }
    
   
  return (
    <div className='container'>
        <h4> Messages </h4>
        <br/>

        {data.map((item, id) =>
         <div className='message' key={item.item}>
            <div className='content'>
            <h4 className='message-header'> {item.subject}</h4>
            <h6 className='message-expand' onClick={() =>  {
              setFormModal(!formModal) 
              setModalinfo(id)
              }}>{item.content} </h6>
            </div>
            <h6 className='message-status'> {item.isRead === true ? 'READ' : 'UNREAD' }</h6>
            </div>
            )}

             <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setFormModal(!formModal)}> { modalinfo && data[modalinfo].subject} </ModalHeader>
          <ModalBody className='modal-body'>
            <div className='mb-2'>
              <Label className='form-label' for='email'> { modalinfo && data[modalinfo].content} </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() =>{
              data[modalinfo].isRead = true;
              update()
              }} >
              Done
            </Button>{' '}
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default Messagecard