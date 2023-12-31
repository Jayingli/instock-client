import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import forwardArrow from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import forwardArrowIcon from "../../assets/icons/chevron_right-24px.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory";
import "./WarehouseInventoryList.scss";

/* 
 * Warehouse Inventory List Component
 * - Represents the list of inventory for a specific warehouse
 * - Includes item name, category, status, quantity
 * - Has delete & editing functions for the inventory items
 */

function WarehouseInventoryList() {
    //State
    const [inventoryData, setInventoryData] = useState([]);
    const [warehouseName, setWarehouseName] = useState("");
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(false);

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
    },[id, shouldRefetch]);

    //GET request
    useEffect(() => {
      // to fetch inventory data for the specific warehouse ID
      const URL = `http://localhost:5050/api/warehouses/${id}/inventories`;
    
      axios
        .get(URL)
        .then((response) => {
          setInventoryData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching inventory data:", error);
        });
    }, [id]);

    // Function to handle when the delete button is clicked
    const deleteItemHandler = (id) => {
        // Set the selectedItemId state with the id of the item to be deleted
        setSelectedItemId(id);
        // Show the delete modal
        setDeleteVisibility(true);
    };

    // Function to update the list after deletion
    const updateListAfterDeletion = (deletedItemId) => {
        // Filter out the deleted item from the inventoryData array
        const updatedList = inventoryData.filter((item) => item.id !== deletedItemId);
        setInventoryData(updatedList);

        // Trigger re-fetch by changing shouldRefetch state
        setShouldRefetch(!shouldRefetch);
    };


    return (
      <div className="warehouse-inventory-list">
          {/* Mobile View */}
          {inventoryData.map((item) => (
              <div className="warehouse-inventory-list__mobile" key={item.id}>
                  <div className="warehouse-inventory-list__mobile-container">
                      <div className="warehouse-inventory-list__mobile-column">
                          <div>
                                <h2 className="warehouse-inventory-list__mobile-title">Inventory Item</h2>
                                <Link className="warehouse-inventory-list__link" to={`/inventories/${item.id}?from=warehouse`}>
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
                          <Link to={`/warehouses/${item.id}/inventories/delete`} >
                                <img className="warehouse-inventory-list__delete" src={deleteIcon} onClick={() => deleteItemHandler(item.id)} alt="Delete Inventory Button"/>
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
                              <h2 className="warehouse-inventory-list__title">Quantity</h2>
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
              <tbody className="warehouse-inventory-list__tbody">
                  {inventoryData.map((item) => (
                      <tr className="warehouse-inventory-list__row-body" key={item.id}>
                          <td className="warehouse-inventory-list__data">
                              <div>
                                  <Link className="warehouse-inventory-list__link" to={`/inventories/${item.id}?from=warehouse`}>
                                      <p className="warehouse-inventory-list__name">{item.item_name}</p>
                                      <img className="warehouse-inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                  </Link>
                              </div>
                          </td>

                          <td className="warehouse-inventory-list__data">
                              <p className="warehouse-inventory-list__category">{item.category}</p>
                          </td>

                          <td className="warehouse-inventory-list__data">
                              <div className={item.status === 'In Stock' ? 'warehouse-inventory-list__in-stock' : 'warehouse-inventory-list__out-of-stock'}>
                                  <p className="warehouse-inventory-list__status">{item.status}</p>
                              </div>
                          </td>

                          <td className="warehouse-inventory-list__data">
                              <p className="warehouse-inventory-list__qty">{item.quantity}</p>
                          </td>

                          <td className="warehouse-inventory-list__data">
                              <div className="warehouse-inventory-list__buttons">
                                  <Link to={`/warehouses/${item.id}/inventories/delete`} >
                                      <img className="warehouse-inventory-list__delete" src={deleteIcon} onClick={() => deleteItemHandler(item.id)} alt="Delete Inventory Button"/>
                                  </Link>
                                  <Link to={`/inventories/${item.id}/edit`}>
                                      <img className="warehouse-inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                                  </Link>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {/* Render the DeleteInventory component only when deleteVisibility is true */}
          {deleteVisibility && (
              <div>
                  {/* Pass the array, page, and the deleteItemHandler function to the DeleteInventory component */}
                  <DeleteInventory
                      array={inventoryData}
                      page="inventory"
                      deleteItemHandler={() => {
                          // Reset the deleteVisibility state and selectedItemId state when the deletion is complete
                          setDeleteVisibility(false);
                          setSelectedItemId(null);
                      }}
                      updateListAfterDeletion={updateListAfterDeletion}
                  />
              </div>
          )}
      </div>
  );
}

export default WarehouseInventoryList;