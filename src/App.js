import Login from './pages/LoginCover'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Messages from './pages/Messages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/messages" element={<Messages />} >
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
