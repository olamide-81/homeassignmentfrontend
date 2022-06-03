import React from 'react'
import '../css/header.css'
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../redux/authslice'

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const home = () => {
    navigate('/')
  }

  return (
      <div className='nav-container'>
    <div className='left' onClick={home}>Message app</div>
    <div className='right'>
      <span onClick={onLogout} className='logout'> Log out </span>
    </div>
    </div>
  )
}

export default Header