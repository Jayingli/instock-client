import { Link } from "react-router-dom";
import Warehouse from "../../Pages/warehouse/warehouse";
import "../warehouseList/warehouseList.scss";
import "../../styles/partials/_global.scss";


//Warehouse List Component

function WarehouseList({ warehouseData }) {
  console.log(warehouseData);

  return (
    <div className="warehouse__list--component">
      <div className="header__wrap">
        <h1>Warehouses</h1>
        <input type="text" name="search" placeholder="Search..."></input>
        <button>+Add New Warehouse</button>
      </div>

      {/* Mobile view set up */}
      <div className="warehouse__list--mobile">
        <div className="warehouse__list--item">
          {warehouseData.map((warehouse) => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>Warehouse</th>
                    <th>Contact Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="">{warehouse.warehouse_name}</a>
                    </td>
                    {/* <Link to={Warehouse}></Link>  replace Warehouse with Warehouse Inventory page when built */}

                    <td>
                      <p>{warehouse.contact_name}</p>
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Contact Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p className="address">{warehouse.address}</p>
                    </td>
                    <td>
                      <p>{warehouse.contact_phone}</p>
                      <a href={`mailto: ${warehouse.contact_email}`}>
                        {warehouse.contact_email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="button__wrap">
                      <img src="#" alt="Delete Warehouse Button" />
                    </td>
                    <td className="button__wrap">
                      <img src="#" alt="Edit Warehouse Button" />
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>

      {/* Tablet/Desktop view setup */}
      <div className="warehouse__list--tabdesc">
        <div className="warehouse__grid--container">
          <div className="grid__header--wrap">
            <h4>Warehouse</h4>
            <h4>Contact Name</h4>
            <h4>Address</h4>
            <h4>Contact Information</h4>
            <h4>Actions</h4>
          </div>

          {/* Map function to generate cards based on server information */}
          {warehouseData.map((warehouse) => {
            return (
              <div className="warehouse__list--item">
                <a href="">{warehouse.warehouse_name}</a>
                {/* <Link to={Warehouse}></Link>  replace Warehouse with Warehouse Inventory page when built */}

                <p>{warehouse.contact_name}</p>

                <p className="address">{warehouse.address}</p>

                <p>{warehouse.contact_phone}</p>
                <a href={`mailto: ${warehouse.contact_email}`}>
                  {warehouse.contact_email}
                </a>

                <div className="button__wrap">
                  <img src="" alt="Delete Warehouse Button" />
                  <img src="" alt="Edit Warehouse Button" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WarehouseList;
