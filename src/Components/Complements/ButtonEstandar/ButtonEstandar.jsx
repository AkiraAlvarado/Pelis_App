
const ButtonEstandar = ({ className, icon, text, onClick }) => {
   return ( 
      <div className={`buttonEstandar ${className} `} onClick={onClick}>
         <i className={icon}></i>
         <p>{text}</p>
      </div>
   );
};

export default ButtonEstandar;