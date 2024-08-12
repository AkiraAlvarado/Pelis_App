import ButtonFilter from "../ButtonFilter/ButtonFilter";
const FilterButtons = ({ buttonData = [], onFilterClick, moviesURL }) => (
   <>
     {buttonData.map((button, index) => (
       <ButtonFilter 
         key={index} 
         text={button.text}  
         onClick={() => onFilterClick(button.url)} 
         selected={moviesURL === button.url} 
       />
     ))}
   </>
 );

export default FilterButtons;