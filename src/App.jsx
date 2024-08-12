import './App.scss';

import Header from './Components/Complements/Header/Header';
import { Outlet } from 'react-router-dom';


function App() {
  return(
    <>
      <Header />
      <Outlet/>
    </>
  )
}

export default App
