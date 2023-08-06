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
        <div className="edit-inventory">
            <div className="edit-inventory__heading">
                <img
                    className="edit-inventory__icon"
                    src={backArrowIcon}
                    alt="Back Arrow Icon"
                    // Call the onCancelEditItem function when back arrow is clicked to return to see inventory details
                    onClick={onCancelEditItem} 
                />
                <h2 className="edit-inventory__title">Edit Inventory Item</h2>
            </div>

            {/* <InventoryForm onCancelAddItem={onCancelAddItem} /> */}
        </div>
    );
}

export default EditInventoryItem;
