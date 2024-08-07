
const ButtonFilter = ({ text, onClick }) => {
   return (
     <div className="buttonFilter" onClick={onClick}>
       {text}
     </div>
   );
 };
 
 export default ButtonFilter;