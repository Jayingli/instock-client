import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import forwardArrowIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory";
import './InventoryList.scss';

/* 
 * Inventory List Component
 * - Represents the whole list of inventory
 * - Includes item name, category, status, quantity, warehouse
 * - Has delete & editing functions for the inventory items
 */

function InventoryList() {
    //State
    const [listData, setListData] = useState([]);
    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [style, setStyle] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); // Add this state variable

    
    //GET request
    useEffect(() => {
        //GET array of all inventories
        const inventoriesURL = "http://localhost:5050/api/inventories";
        axios.get(inventoriesURL)
            .then((response) => {
                setListData(response.data);
            });
    }, []);

    const deleteItemHandler = (id) => {
        setDeleteVisibility(!deleteVisibility);
        setStyle(!style);
        setSelectedItemId(id); // Save the selected itemId in the state
        console.log(deleteVisibility);
    }

    return (
        <div className="inventory-list">
            <table className="inventory-list__table">
                <thead className="inventory-list__header">
                    <tr className="inventory-list__row-header">
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">Inventory Item</h2>
                                <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                            </div>
                        </th>
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">Category</h2>
                                <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                            </div>
                        </th>
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">Status</h2>
                                <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                            </div>
                        </th>
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">QTY</h2>
                                <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                            </div>
                        </th>
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">Warehouse</h2>
                                <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                            </div>
                        </th>
                        <th>
                            <div className="inventory-list__column-header">
                                <h2 className="inventory-list__title">Actions</h2>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((item) => (
                        <tr className="inventory-list__row-body" key={item.id}>
                            <div className="inventory-list__content">
                                <div className="inventory-list__column-body">
                                    <td className="inventory-list__data">
                                        <h2 className="inventory-list__title-mobile">Inventory Item</h2>
                                        <div>
                                            <Link className="inventory-list__link" to={`/inventories/${item.id}`}>
                                                <p className="inventory-list__name">{item.item_name}</p>
                                                <img className="inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="inventory-list__data">
                                        <h2 className="inventory-list__title-mobile">Category</h2>
                                        <p className="inventory-list__paragraph">{item.category}</p>
                                    </td>
                                </div>
                                <div className="inventory-list__column-body">
                                    <td className="inventory-list__data">
                                        <h2 className="inventory-list__title-mobile">Status</h2>
                                        <div className={item.status === 'In Stock' ? 'inventory-list__in-stock' : 'inventory-list__out-of-stock'}>
                                            <p className="inventory-list__status">{item.status}</p>
                                        </div>
                                    </td>
                                    <td className="inventory-list__data">
                                        <h2 className="inventory-list__title-mobile">Qty</h2>
                                        <p className="inventory-list__qty">{item.quantity}</p>
                                    </td>
                                    <td className="inventory-list__data">
                                        <h2 className="inventory-list__title-mobile">Warehouse</h2>
                                        <p className="inventory-list__warehouse">{item.warehouse_name}</p>
                                    </td>
                                </div>
                            </div>
                            <div>
                                <td className="inventory-list__action-icons">
                                    <div className="inventory-list__buttons">
                                        <Link to={`/inventories/${item.id}/delete`} >
                                            <img className="inventory-list__delete" src={deleteIcon} alt="Delete Inventory Button"onClick={() => deleteItemHandler(item.id)}/>
                                        </Link>
                                        <Link to={`/inventories/${item.id}/edit`}>
                                            <img className="inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                                        </Link>
                                    </div>
                                </td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Passing the listData array as the array prop to DeleteInventory */}
      {deleteVisibility && (
        <DeleteInventory
          array={listData} // Pass the 'listData' as the 'array' prop
          itemId={selectedItemId} // Pass the selectedItemId as the itemId prop
          onCancelDelete={() => setDeleteVisibility(false)}
        />
      )}
        </div>
    );
}
  
export default InventoryList;