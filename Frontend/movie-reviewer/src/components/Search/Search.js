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
                    />
                <button onClick={handleSearchMovies} className='search-button'>Search</button>
            </form>
        </div>
        ) 
    } 