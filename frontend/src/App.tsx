import './App.css'
import Layout from './components/layout'
import Home from './pages/home'
import Detail from './pages/detail'
import Orders from './pages/view_orders'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="orders" element={<Orders orderId={''} totalPrice={0} userId={0} status={''} />} />
        <Route path="/product/:id"  element={<Detail />} /></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App