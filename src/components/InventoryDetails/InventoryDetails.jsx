import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import EditInventoryItem from "../EditInventoryItem/EditInventoryItem";
import "./InventoryDetails.scss";

/* 
 * InventoryDetails Component
 * - Represents the details of a specific inventory item
 * - Includes item name, description, category, status, quantity, warehouse
 * - Has an editing function
 * - Utilizes URL query parameters to determine where to go back based on where the user came from
 */

function InventoryDetails() {
    //State
    const [details, setDetails] = useState([]);
    const [warehouseId, setWarehouseId] = useState([]);

    //Get current id
    const { id } = useParams();

    // Get the location object from the router
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fromWarehouse = queryParams.get("from") === "warehouse";

    console.log("fromWarehouse:", fromWarehouse);

    //GET request
    useEffect(() => {
        //GET array of all inventories
        const inventoriesURL = "http://localhost:5050/api/inventories";
        axios.get(inventoriesURL)
            .then((response) => {
                setDetails(response.data);
          });
    }, []);

    useEffect(() => {
        //GET array of all inventories
        const warehousesURL = "http://localhost:5050/api/warehouses";
        axios.get(warehousesURL)
            .then((response) => {
                setWarehouseId(response.data);
          });
    }, []);

    // State to track whether edit button is clicked
    const [showEditItem, setShowEditItem] = useState(false);

    // Toggle to edit mode when the edit button is clicked
    const handleEditItemClick = () => {
        setShowEditItem(true);
    };

    // Toggle back to view mode when editing is cancelled
    const handleCancelEditItem = () => {
        setShowEditItem(false);
    };

    return (
        <div className="inventory-details">
            {/* If editing is true, render EditInventoryItem */}
            {showEditItem ? (
                <EditInventoryItem id={id} onCancelEditItem={handleCancelEditItem} />
            ) : (
                // Otherwise, render the InventoryDetails
                <>
                    {details.map((item) => {
                        // If item id is equal to url id, build component below with that data
                        if (item.id == id) {
                            const correspondingWarehouse = warehouseId.find(
                                warehouse => warehouse.warehouse_name === item.warehouse_name
                            );
                            return (
                                <div>
                                    <div className="inventory-details__header">
                                        <div className="inventory-details__heading">
                                            {/* Determine where to go back based on where the user came from */}
                                            {correspondingWarehouse && (
                                                <Link to={
                                                    fromWarehouse
                                                        ? `/warehouses/${correspondingWarehouse.id}`
                                                        : `/inventories`
                                                }> 
                                                    <img
                                                        className="inventory-details__icon"
                                                        src={backArrowIcon}
                                                        alt="Back Arrow Icon"
                                                    />
                                                </Link>
                                            )}
                                            <h1 className="inventory-details__title">{item.item_name}</h1>
                                        </div>

                                        <div className="inventory-details__edit-mobile">
                                            <img className="inventory-details__edit-icon" src={editIcon} alt="Edit Icon" onClick={handleEditItemClick}/>
                                        </div>

                                        <div className="inventory-details__edit-tablet">
                                            <Button variant="primary" text="Edit" icon={editIcon} onClick={handleEditItemClick} />
                                        </div>
                                    </div>

                                    <div className="inventory-details__body">
                                        <div className="inventory-details__column">
                                            <h2 className="inventory-details__subtitle">Item Description:</h2>
                                            <p className="inventory-details__paragraph">{item.description}</p>

                                            <h2 className="inventory-details__subtitle">Category:</h2>
                                            <p className="inventory-details__paragraph-two">{item.category}</p>
                                        </div>

                                        <div className="inventory-details__column">
                                            <div className="inventory-details__wrap">
                                                <div>
                                                    <h2 className="inventory-details__subtitle">Status:</h2>

                                                    <div className={item.status.toLowerCase() === 'in stock' ? 'inventory-details__in-stock' : item.status.toLowerCase() === 'out of stock' ? 'inventory-details__out-of-stock' : ''}>
                                                        <p className="inventory-details__status">{item.status}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="inventory-details__subtitle">Quantity:</h2>
                                                    <p className="inventory-details__paragraph">{item.quantity}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h2 className="inventory-details__subtitle">Warehouse:</h2>
                                                <p className="inventory-details__paragraph-two">{item.warehouse_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </>
            )}
        </div>
    );
}

export default InventoryDetails;