import { Link } from "react-router-dom";
import InventoryForm from "../InventoryForm/InventoryForm";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./AddNewInventoryItem.scss";

/*
 * Add New Inventory Item Component
 * - Represents the add new inventory section with the form for adding new inventory item
 */

function AddNewInventoryItem({ onCancelAddItem }) {
    return (
        <div className="add-inventory">
            <div className="add-inventory__heading">
                <img
                    className="add-inventory__icon"
                    src={backArrowIcon}
                    alt="Back Arrow Icon"
                    // Call the onCancelAddItem function when back arrow is clicked to return to see inventory list
                    onClick={onCancelAddItem} 
                />
                <h2 className="add-inventory__title">Add New Inventory Item</h2>
            </div>

            <InventoryForm onCancelAddItem={onCancelAddItem} />
        </div>
    );
}

export default AddNewInventoryItem;
