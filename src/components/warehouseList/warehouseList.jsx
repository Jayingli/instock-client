import { Link } from "react-router-dom";
import Warehouse from "../../Pages/warehouse/warehouse";
import "../warehouseList/warehouseList.scss";

//Warehouse List Component

function WarehouseList() {
  return (
    <div className="warehouse__list--component">
      <h1>Warehouses</h1>
      <input type="text" name="search" placeholder="Search..."></input>
      <button>+Add New Warehouse</button>

      <div className="warehouse__list">
        {/* Map function to generate cards based on server information */}

        {/* Example card */}
        <div className="warehouse__list--item">
          <h4>Warehouse</h4>

          <h4>Contact Name</h4>

          <a href="">Manhattan</a>
          {/* <Link to={Warehouse}></Link>  replace Warehouse with Warehouse Inventory page when built */}

          <p>Parmin Aujla</p>

          <h4>Address</h4>

          <h4>Contact Information</h4>

          <p className="address">503 Broadway, New York, USA</p>

          <p>+1 (629) 555-0129</p>
          <a href="mailto: paujla@instock.com">paujla@instock.com</a>
          <div className="button__wrap">
            <img src="" alt="Delete Warehouse Button" />
            <img src="" alt="Edit Warehouse Button" />
          </div>
        </div>

        <div className="warehouse__list--item">
          <table>
            <tr>
              <th>Warehouse</th>
              <th>Contact Name</th>
              <th>Address</th>
              <th>Contact Information</th>
              {/* <th>Actions</th> */}
                {/*To be hidden on mobile*/}

            </tr>

            <tr>
              <td><a href="">Manhattan</a></td>
              {/* <Link to={Warehouse}></Link>  replace Warehouse with Warehouse Inventory page when built */}

              <td><p>Parmin Aujla</p></td>

              <td><p className="address">503 Broadway, New York, USA</p></td>

              <td><p>+1 (629) 555-0129</p></td>

              <td><a href="mailto: paujla@instock.com">paujla@instock.com</a></td>

              <td className="button__wrap">
                <img src="" alt="Delete Warehouse Button" />
                <img src="" alt="Edit Warehouse Button" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WarehouseList;
