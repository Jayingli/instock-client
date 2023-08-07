import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
 */

function InventoryDetails() {
    //State
    const [details, setDetails] = useState([]);

    //Get current id
    const { id } = useParams();

    //GET request
    useEffect(() => {
        //GET array of all inventories
        const inventoriesURL = "http://localhost:5050/api/inventories";
        axios.get(inventoriesURL)
            .then((response) => {
                setDetails(response.data);
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
                            return (
                                <div>
                                    <div className="inventory-details__header">
                                        <div className="inventory-details__heading">
                                            <Link to={`/inventories?from=warehouse`}>
                                                <img
                                                    className="inventory-details__icon"
                                                    src={backArrowIcon}
                                                    alt="Back Arrow Icon"
                                                />
                                            </Link>
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

                                                    <div className={item.status === 'In Stock' ? 'inventory-details__in-stock' : 'inventory-details__out-of-stock'}>
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