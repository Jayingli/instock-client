import './SearchBar.scss';

/* 
SearchBar Component
- Represents a search bar input field
*/

function SearchBar() {
    return (
        <div className="search-bar">
            <input className="search-bar__input" type="text" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;