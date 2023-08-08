import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button/Button';
import AddNewWarehouse from '../../components/AddNewWarehouse/AddNewWarehouse';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import './WarehousesPage.scss';

function WarehousesPage() {
    // State to track whether "Add New Warehouse" button is clicked
    const [showAddWarehouse, setShowAddWarehouse] = useState(false);
    // State to hold the list of warehouses
    const [warehouses, setWarehouses] = useState([]); 

    // Function to handle when "Add New Warehouse" button is clicked
    const handleAddWarehouseClick = () => {
        setShowAddWarehouse(true);
    };

    // Function to handle when "Cancel" button is clicked in AddNewWarehouse component
    const handleCancelAddWarehouse = () => {
        setShowAddWarehouse(false);
    };

    // Function to update the warehouse list state with the newly added warehouse
    const handleAddWarehouse = (newWarehouse) => {
        setWarehouses([...warehouses, newWarehouse]);
        setShowAddWarehouse(false); // Close the AddNewWarehouse component
    };

    return (
        <div className="warehouses-page">
            {/* Conditional rendering based on "showAddWarehouse" state */}
            {showAddWarehouse ? null : (
                // Display the Warehouse page header with title and actions when "showAddWarehouse" is false
                <div className="warehouses-page__header">
                    <h1 className="warehouses-page__title">Warehouses</h1>
                    <div className="warehouses-page__actions">
                        <SearchBar />
                        {!showAddWarehouse && (
                            <Button variant="primary" text="+ Add New Warehouse" onClick={handleAddWarehouseClick} />
                        )}
                    </div>
                </div>
            )}
            {/* Conditional rendering based on "showAddWarehouse" state */}
            {showAddWarehouse ? (
                // Render the AddNewWarehouse component when "showAddWarehouse" is true
                <AddNewWarehouse onCancelAddWarehouse={handleCancelAddWarehouse} onAddWarehouse={handleAddWarehouse}/>
            ) : (
                // Render the WarehouseList component when "showAddWarehouse" is false
                <WarehouseList />
            )}
        </div>   
    );
};

export default WarehousesPage;