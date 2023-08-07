import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button/Button';
import AddNewInventoryItem from '../../components/AddNewInventoryItem/AddNewInventoryItem';
import InventoryList from '../../components/InventoryList/InventoryList';
import DeleteInventory from '../../components/DeleteInventory/DeleteInventory';
import './InventoryPage.scss';

/* 
 * Inventory Page
 * - Represents the Inventory page with the InventoryList component
 * - Has a search bar & add new item button
 */

function InventoryPage() {
    // State to track whether "Add New Item" button is clicked
    const [showAddItem, setShowAddItem] = useState(false);

    // Function to handle when "Add New Item" button is clicked
    const handleAddItemClick = () => {
        setShowAddItem(true);
    };

    // Function to handle when "Cancel" button is clicked in AddNewInventoryItem component
    const handleCancelAddItem = () => {
        setShowAddItem(false);
    };

    return (
        <div className="inventory-page">
            {/* Conditional rendering based on "showAddItem" state */}
            {showAddItem ? null : (
                // Display the Inventory page header with title and actions when "showAddItem" is false
                <div className="inventory-page__header">
                    <h1 className="inventory-page__title">Inventory</h1>
                    <div className="inventory-page__actions">
                        <SearchBar />
                        {!showAddItem && (
                            <Button variant="primary" text="+ Add New Item" onClick={handleAddItemClick} />
                        )}
                    </div>
                </div>
            )}
            {/* Conditional rendering based on "showAddItem" state */}
            {showAddItem ? (
                // Render the AddNewInventoryItem component when "showAddItem" is true
                <AddNewInventoryItem onCancelAddItem={handleCancelAddItem} />
            ) : (
                // Render the InventoryList component when "showAddItem" is false
                <InventoryList />
                // <DeleteInventory obj="television" page="inventory" />
            )}
        </div>        
    );
}

export default InventoryPage;