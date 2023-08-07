import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import forwardArrow from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import forwardArrowIcon from "../../assets/icons/chevron_right-24px.svg";
import "./WarehouseInventoryList.scss";

//Warehouse Inventory List Component

function WarehouseInventoryList() {
    //State
    const [inventoryfilteredData, setInventoryfilteredData] = useState([]);
    const [warehouseName, setWarehouseName] = useState("");

    //GET current ID
    const { id } = useParams();

    //GET request
    useEffect(() => {
        const URL = `http://localhost:5050/api/warehouses/${id}`;

        axios
            .get(URL)

            .then((res) => {
              //Store warehouse name data in a warehouseNameData variable
              const warehouseNameData = res.data[0].warehouse_name;
              console.log(warehouseNameData);

              //Set WarehouseName to the string of warehouseNameData
              setWarehouseName(warehouseNameData);
            });
  },[]);

  //GET request
  useEffect(() => {
    // to fetch inventory data for the specific warehouse ID
    const URL = `http://localhost:5050/api/warehouses/${id}/inventories`;
  
    axios
      .get(URL)
      .then((res) => {
        const inventoryData = res.data;
        console.log(inventoryData);
        setInventoryfilteredData(inventoryData);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, [id]);

  return (
      <div className="warehouse-inventory-list">
          {/* Mobile View */}
          {inventoryfilteredData.map((item) => (
              <div className="warehouse-inventory-list__mobile" key={item.id}>
                  <div className="warehouse-inventory-list__mobile-container">
                      <div className="warehouse-inventory-list__mobile-column">
                          <div>
                                <h2 className="warehouse-inventory-list__mobile-title">Inventory Item</h2>
                                <Link className="warehouse-inventory-list__link" to={`/inventories/${item.id}`}>
                                    <p className="warehouse-inventory-list__name">{item.item_name}</p>
                                    <img className="warehouse-inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                </Link>
                          </div>
                          <div className="warehouse-inventory-list__mobile-category">
                              <h2 className="warehouse-inventory-list__mobile-title">Category</h2>
                              <p className="warehouse-inventory-list__paragraph">{item.category}</p>
                          </div>
                      </div>
                      <div className="warehouse-inventory-list__mobile-column">
                          <div>
                              <h2 className="warehouse-inventory-list__mobile-title">Status</h2>
                              <div className={item.status === 'In Stock' ? 'warehouse-inventory-list__in-stock' : 'warehouse-inventory-list__out-of-stock'}>
                                  <p className="warehouse-inventory-list__status">{item.status}</p>
                              </div>
                          </div>
                          <div className="warehouse-inventory-list__mobile-qty">
                              <h2 className="warehouse-inventory-list__mobile-title">Qty</h2>
                              <p className="warehouse-inventory-list__paragraph">{item.quantity}</p> 
                          </div>
                      </div>
                  </div>
                  <div>
                      <div className="warehouse-inventory-list__buttons">
                          <Link to={`/inventories/${item.id}/delete`} >
                                <img className="warehouse-inventory-list__delete" src={deleteIcon} alt="Delete Inventory Button"/>
                            </Link>
                          <Link to={`/inventories/${item.id}/edit`}>
                                <img className="warehouse-inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                          </Link>
                      </div>
                  </div>
              </div>
          ))}
          {/* Tablet / Desktop View */}
          <table className="warehouse-inventory-list__table">
              <thead className="warehouse-inventory-list__header">
                  <tr className="warehouse-inventory-list__row-header">
                      <th>
                          <div className="warehouse-inventory-list__column-header">
                              <h2 className="warehouse-inventory-list__title">Inventory Item</h2>
                              <img className="warehouse-inventory-list__icon" src={sortIcon} alt="sort icon" />
                          </div>
                      </th>
                      <th>
                          <div className="warehouse-inventory-list__column-header">
                              <h2 className="warehouse-inventory-list__title">Category</h2>
                              <img className="warehouse-inventory-list__icon" src={sortIcon} alt="sort icon" />
                          </div>
                      </th>
                      <th>
                          <div className="warehouse-inventory-list__column-header">
                              <h2 className="warehouse-inventory-list__title">Status</h2>
                              <img className="warehouse-inventory-list__icon" src={sortIcon} alt="sort icon" />
                          </div>
                      </th>
                      <th>
                          <div className="warehouse-inventory-list__column-header">
                              <h2 className="warehouse-inventory-list__title">QTY</h2>
                              <img className="warehouse-inventory-list__icon" src={sortIcon} alt="sort icon" />
                          </div>
                      </th>
                      <th>
                          <div className="warehouse-inventory-list__column-header">
                              <h2 className="warehouse-inventory-list__title">Actions</h2>
                          </div>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {inventoryfilteredData.map((item) => (
                      <tr className="warehouse-inventory-list__row-body" key={item.id}>
                          {/* <div className="warehouse-inventory-list__content">
                              <div className="warehouse-inventory-list__column-body"> */}
                                  <td className="warehouse-inventory-list__data">
                                      <h2 className="warehouse-inventory-list__title-mobile">Inventory Item</h2>
                                      <div>
                                          <Link className="warehouse-inventory-list__link" to={`/inventories/${item.id}`}>
                                              <p className="warehouse-inventory-list__name">{item.item_name}</p>
                                              <img className="warehouse-inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                          </Link>
                                      </div>
                                  </td>
                                  <td className="warehouse-inventory-list__data">
                                      <h2 className="warehouse-inventory-list__title-mobile">Category</h2>
                                      <p className="warehouse-inventory-list__paragraph">{item.category}</p>
                                  </td>
                              {/* </div>
                              <div className="warehouse-inventory-list__column-body"> */}
                                  <td className="warehouse-inventory-list__data">
                                      <h2 className="warehouse-inventory-list__title-mobile">Status</h2>
                                      <div className={item.status === 'In Stock' ? 'warehouse-inventory-list__in-stock' : 'warehouse-inventory-list__out-of-stock'}>
                                          <p className="warehouse-inventory-list__status">{item.status}</p>
                                      </div>
                                  </td>
                                  <td className="warehouse-inventory-list__data">
                                      <h2 className="warehouse-inventory-list__title-mobile">Qty</h2>
                                      <p className="warehouse-inventory-list__qty">{item.quantity}</p>
                                  </td>
                              {/* </div> */}
                          {/* </div> */}
                          {/* <div> */}
                              <td className="warehouse-inventory-list__action-icons">
                                  <div className="warehouse-inventory-list__buttons">
                                      <Link to={`/inventories/${item.id}/delete`} >
                                          <img className="warehouse-inventory-list__delete" src={deleteIcon} alt="Delete Inventory Button"/>
                                      </Link>
                                      <Link to={`/inventories/${item.id}/edit`}>
                                          <img className="warehouse-inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                                      </Link>
                                  </div>
                              </td>
                          {/* </div> */}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default WarehouseInventoryList;