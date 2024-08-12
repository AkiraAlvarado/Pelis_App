const ButtonFilter = ({ text, onClick, selected }) => {
   return (
     <div 
       onClick={onClick}  
       className={`buttonFilter ${selected ? "active-button" : ""}`}
     >
       {text}
     </div>
   );
 };
 
 export default ButtonFilter;