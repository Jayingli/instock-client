import searchIcon from "../../assets/icons/search-24px.svg";
import '../searchHeader/searchHeader.scss';

//SearchHeader Component

function SearchHeader({obj, page}) {

    return (
        <div className="header__wrap">
            <h1>{page}</h1>

            <div className="input__wrap">
                <input type="search" name="search" placeholder="Search..."></input>

                <button className="search">
                <img src={searchIcon} alt="" className="search--icon" />
                </button>
            </div>

            <button>+ Add New {obj}</button>
        </div>

    )
}

export default SearchHeader;