import { Link } from "react-router-dom";
import InventoryForm from "../InventoryForm/InventoryForm";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditInventoryItem.scss";

/*
 * Edit Inventory Item Component
 * - Represents the edit existing inventory item
 */

function EditInventoryItem({ onCancelEditItem }) {
    return (
        <div className="add-inventory">
            <div className="add-inventory__heading">
                <img
                    className="add-inventory__icon"
                    src={backArrowIcon}
                    alt="Back Arrow Icon"
                    // Call the onCancelAddItem function when back arrow is clicked to return to see inventory list
                    onClick={onCancelEditItem} 
                />
                <h2 className="add-inventory__title">Edit Inventory Item</h2>
            </div>

            {/* <InventoryForm onCancelAddItem={onCancelAddItem} /> */}
        </div>
    );
}

export default EditInventoryItem;
