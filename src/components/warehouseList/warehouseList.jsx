import { Link } from 'react-router-dom';
import Warehouse from '../../Pages/warehouse/warehouse';

//Warehouse List Component

function WarehouseList() {

    return(
        <div className="warehouse__list">
            <h1>Warehouses</h1>
            <input><img></img></input>
            <button>+Add New Warehouse</button>
            
            <ul>
                {/* Map function to generate cards based on server information */}

                {/* Example card */}
                <div className="warehouse__list--item">
                    <h4>Warehouse</h4>
                    <Link to={Warehouse}></Link>  {/*replace Warehouse with Warehouse Inventory page when built*/}

                    <h4>Contact Name</h4>
                    <p>Parmin Aujla</p>

                    <h4>Address</h4>
                    <p>503 Broadway, New York, USA</p>

                    <h4>Contact Information</h4>
                    <p>+1 (629) 555-0129</p>
                    <a href="mailto: paujla@instock.com">paujla@instock.com</a>    

                    <img src="" alt="Delete Warehouse Button" />
                    <img src="" alt="Edit Warehouse Button" />

                </div>


            </ul>

        </div>
    )
}

export default WarehouseList;