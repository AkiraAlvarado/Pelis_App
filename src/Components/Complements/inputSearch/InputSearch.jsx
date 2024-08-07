
const InputSearch = ({ text, onChange }) => {
   return (
      <div className="inputSearch-container">
         <input
            className="inputSearch"
            type="text"
            placeholder={text}
            onChange={onChange} // Add onChange handler
         />
      </div>
   );
};

export default InputSearch;