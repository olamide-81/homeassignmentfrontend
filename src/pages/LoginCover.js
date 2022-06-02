import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Input, Form, Button, CardTitle, CardText  } from 'reactstrap'
import '../css/login.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../redux/authslice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner.js'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/home')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
       <Card className='card'>
         <CardHeader className='card-header'> 
            
         </CardHeader>
         <CardBody className='card-body'>
           
             <Form className='form' onSubmit={onSubmit}>
             <Input type='email' id='login-email' placeholder='john@example.com' autoFocus name='email'
                value={email} 
                onChange={onChange} ></Input>
             <br/>
             <Input id='login-password' name='password' type='password'
                value={password} 
                onChange={onChange}  ></Input>
             <br/>
             <Button>Submit</Button>
             </Form>
         </CardBody>
         <CardFooter className='card-footer'>
             <CardText className='user-details'>
                 User 1 <br/>
                 Email: user1@gmail.com <br/>
                 Password: password
             </CardText>
             <CardText className='user-details'>
                 User 1 <br/>
                 Email: user1@gmail.com <br/>
                 Password: password
             </CardText>
         </CardFooter>
    </Card>
  )
}

export default Login