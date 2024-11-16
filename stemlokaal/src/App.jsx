import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from '../components/Header'
import Websites from '../components/Websites'

function App() {
  return (
    <div>
      <Header />
      <hr/>
      <Websites />
    </div>
  )
}

export default App
