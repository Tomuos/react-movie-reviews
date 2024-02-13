import './Search.css';

export default function SearchMovie ({searchTerm, setSearchTerm, handleSearchMovies}) {
    return (
        <div className='searchBar'>
            <form className="search">
                <input
                    type="text"
                    placeholder="Look for a movie..."
                    value={searchTerm}
                    onChange={setSearchTerm}      
                    className='search-input'          
                    />
                <button onClick={handleSearchMovies} className='search-button search-input'>Search</button>
            </form>
        </div>
        ) 
    } 