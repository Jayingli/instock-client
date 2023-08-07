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

    // const deleteItemHandler = (id) => {
    //     // setDeleteVisibility(!deleteVisibility);
    //     // setStyle(!style);
    //     setSelectedItemId(id); // Save the selected itemId in the state
    //     setDeleteVisibility(true); // Show the DeleteInventory modal
    //     setStyle(!style);
    // }

    // const deleteItemHandler = (id) => {

    //     setDeleteVisibility(!deleteVisibility);
    //     setStyle(!style);
    
    // }

       // Function to handle when the delete button is clicked
       const deleteItemHandler = (id) => {
        // Set the selectedItemId state with the id of the item to be deleted
        setSelectedItemId(id);
        // Show the delete modal
        setDeleteVisibility(true);
    };

    return (
        <div className="inventory-list">
            {/* Mobile View */}
            {listData.map((item) => (
                <div className="inventory-list__mobile" key={item.id}>
                    <div className="inventory-list__mobile-container">
                        <div className="inventory-list__mobile-column">
                            <div>
                                <h2 className="inventory-list__mobile-title">Inventory Item</h2>
                                <Link className="inventory-list__link" to={`/inventories/${item.id}`}>
                                    <p className="inventory-list__name">{item.item_name}</p>
                                    <img className="inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                </Link>
                            </div>
                            <div className="inventory-list__mobile-category">
                                <h2 className="inventory-list__mobile-title">Category</h2>
                                <p className="inventory-list__paragraph">{item.category}</p>
                            </div>
                        </div>
                        <div className="inventory-list__mobile-column">
                            <div>
                                <h2 className="inventory-list__mobile-title">Status</h2>
                                <div className={item.status === 'In Stock' ? 'inventory-list__in-stock' : 'inventory-list__out-of-stock'}>
                                    <p className="inventory-list__status">{item.status}</p>
                                </div>
                            </div>
                            <div className="inventory-list__mobile-qty">
                                <h2 className="inventory-list__mobile-title">Qty</h2>
                                <p className="inventory-list__paragraph">{item.quantity}</p> 
                            </div>
                            <div className="inventory-list__mobile-warehouse">
                                <h2 className="inventory-list__mobile-title">Warehouse</h2>
                                <p className="inventory-list__paragraph">{item.warehouse_name}</p> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="inventory-list__buttons">
                            <Link to={`/inventories/${item.id}/delete`} >
                                    <img className="inventory-list__delete" src={deleteIcon} onClick={deleteItemHandler} alt="Delete Inventory Button"/>
                                </Link>
                            <Link to={`/inventories/${item.id}/edit`}>
                                    <img className="inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Tablet / Desktop View */}
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
                                <h2 className="inventory-list__title">Qty</h2>
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
                <tbody className="inventory-list__tbody">
                    {listData.map((item) => (
                        <tr className="inventory-list__row-body" key={item.id}>
                            <td className="inventory-list__data">
                                <div>
                                    <Link className="inventory-list__link" to={`/inventories/${item.id}`}>
                                        <p className="inventory-list__name">{item.item_name}</p>
                                        <img className="inventory-list__link-icon" src={forwardArrowIcon} alt="Forward Arrow Icon" />
                                    </Link>
                                </div>
                            </td>

                            <td className="inventory-list__data">
                                <p className="inventory-list__category">{item.category}</p>
                            </td>

                            <td className="inventory-list__data">
                                <div className={item.status === 'In Stock' ? 'inventory-list__in-stock' : 'inventory-list__out-of-stock'}>
                                    <p className="inventory-list__status">{item.status}</p>
                                </div>
                            </td>

                            <td className="inventory-list__data">
                                <p className="inventory-list__qty">{item.quantity}</p>
                            </td>

                            <td className="inventory-list__data">
                                <p className="inventory-list__warehouse">{item.warehouse_name}</p>
                            </td>

                            <td className="inventory-list__data">
                                <div className="inventory-list__buttons">
                                    <Link to={`/inventories/${item.id}/delete`} >
                                        <img className="inventory-list__delete" src={deleteIcon} onClick={() => deleteItemHandler(item.id)} alt="Delete Inventory Button"/>
                                    </Link>
                                    <Link to={`/inventories/${item.id}/edit`}>
                                        <img className="inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Render the DeleteInventory component only when deleteVisibility is true */}
            {deleteVisibility && (
                <div className="delete__component--wrap">
                    {/* Pass the array, page, and the deleteItemHandler function to the DeleteInventory component */}
                    <DeleteInventory
                        array={listData}
                        page="inventory"
                        deleteItemHandler={() => {
                            // Reset the deleteVisibility state and selectedItemId state when the deletion is complete
                            setDeleteVisibility(false);
                            setSelectedItemId(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
  
export default InventoryList;