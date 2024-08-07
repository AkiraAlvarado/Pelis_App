import { useState } from "react";


const Header = () => {
   const[show, setShow] = useState("false")

   const toggleShow = () =>{
      setShow(!show)
   }

   return(
      <header>
         <div className="header l-container">
            <div className="logo">
               <p>SuperPelis</p>
            </div> 
            <div className="navBar__toggle" onClick={toggleShow}>
            </div>
            <div className={`navBar ${show ? '' : 'show'}`}>
               <div className="flex">
                  <i className="fa-solid fa-house-chimney-crack"></i>
                  <p>Peliculas</p>
               </div>
               <div className="flex"> 
                  <i className="fa-solid fa-tv"></i>
                  <p>Series de TV</p>
               </div>
               <div className="flex">
                  <i className="fa-solid fa-person"></i>
                  <p>Actores</p>
               </div>
            </div>
         </div>
      </header>
   )
}
export default Header;