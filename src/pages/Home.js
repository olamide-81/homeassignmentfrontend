import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../css/home.css'
import Header from '../components/header'
import Messageapp from '../components/messageapp'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <div className='home'>
     <Header/>
     <Messageapp/>
     </div>
  )
}

export default Home