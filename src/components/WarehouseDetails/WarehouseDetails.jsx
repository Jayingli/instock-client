import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import EditWarehouse from "../EditWarehouse/EditWarehouse";
import WarehouseInventoryList from "../WarehouseInventoryList/WarehouseInventoryList";
import "./WarehouseDetails.scss";

/* 
 * Warehouse Details Component
 * - Represents the details of a specific warehouse
 * - Includes warehouse name, address, contact name, contact info, and list of inventory items
 * - Inventory item includes item name, category, status, quantity, and editing or delete functions
 * - Has an editing warehouse function
 */

function WarehouseDetails() {
  //State
  const [details, setDetails] = useState([]);

  //Get current id
  const { id } = useParams();

  //GET request
  useEffect(() => {
      //GET array of all warehouses
      const warehousesURL = "http://localhost:5050/api/warehouses";
      axios.get(warehousesURL)
          .then((response) => {
              setDetails(response.data);
      });
  }, []);

  // State to track whether edit button is clicked
  const [showEditWarehouse, setShowEditWarehouse] = useState(false);

  // Toggle to edit mode when the edit button is clicked
  const handleEditWarehouseClick = () => {
      setShowEditWarehouse(true);
  };

  // Toggle back to view mode when editing is cancelled
  const handleCancelEditWarehouse = () => {
      setShowEditWarehouse(false);
  };

  return (
      <div className="warehouse-details">
          {/* If editing is true, render EditWarehouse */}
          {showEditWarehouse ? (
                <EditWarehouse id={id} onCancelEditWarehouse={handleCancelEditWarehouse} />
            ) : (
                // Otherwise, render the WarehouseDetails
                <>
                    {details.map((warehouse) => {
                        // If warehouse id is equal to url id, build component below with that data
                        if (warehouse.id == id) {
                            return (
                                <div>
                                    <div className="warehouse-details__header">
                                        <div className="warehouse-details__heading">
                                            <Link to="/warehouses">
                                                <img
                                                    className="warehouse-details__icon"
                                                    src={backArrowIcon}
                                                    alt="Back Arrow Icon"
                                                />
                                            </Link>
                                            <h1 className="warehouse-details__title">{warehouse.warehouse_name}</h1>
                                        </div>

                                        <div className="warehouse-details__edit-mobile">
                                            <img 
                                                className="warehouse-details__edit-icon" 
                                                src={editIcon} 
                                                alt="Edit Icon" 
                                                onClick={handleEditWarehouseClick}
                                            />
                                        </div>

                                        <div className="warehouse-details__edit-tablet">
                                            <Button 
                                                variant="primary" 
                                                text="Edit" 
                                                icon={editIcon} 
                                                onClick={handleEditWarehouseClick} 
                                            />
                                        </div>
                                    </div>
                                    <div className="warehouse-details__body">
                                        <div className="warehouse-details__address-mobile">
                                            <h2 className="warehouse-details__subtitle">Warehouse Address:</h2>
                                            <p className="warehouse-details__paragraph">
                                              {warehouse.address}, {warehouse.city}, {warehouse.country}
                                            </p>
                                        </div>

                                        <div className="warehouse-details__address-tablet">
                                            <h2 className="warehouse-details__subtitle">Warehouse Address:</h2>
                                            <p className="warehouse-details__paragraph">{warehouse.address},<br/>
                                                {warehouse.city}, {warehouse.country}
                                            </p>
                                        </div>

                                        <div className="warehouse-details__contact">
                                            <div>
                                                <h2 className="warehouse-details__subtitle">Contact Name:</h2>
                                                <p className="warehouse-details__paragraph">{warehouse.contact_name}<br/>
                                                    {warehouse.contact_position}
                                                </p>
                                            </div>

                                            <div>
                                                <h2 className="warehouse-details__subtitle">Contact Information:</h2>
                                                <p className="warehouse-details__paragraph">{warehouse.contact_phone}<br/>
                                                    <a className="warehouse-details__email" href={`mailto: ${warehouse.contact_email}`}>
                                                      {warehouse.contact_email}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}

                    <WarehouseInventoryList />
                </>
            )}
        </div>
    );
}

export default WarehouseDetails;
