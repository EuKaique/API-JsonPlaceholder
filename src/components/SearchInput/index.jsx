import './style.css';

export const SearchInput = ({searchValue, handleChange}) => {
    return(
            <input
            className="search-input" 
            type="search" 
            name="search" 
            id="search"
            placeholder="Digite o que você está procurando" 
            value={searchValue} 
            onChange={handleChange}/>
        )
}