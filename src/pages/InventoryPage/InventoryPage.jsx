import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button/Button';
import AddNewInventoryItem from '../../components/AddNewInventoryItem/AddNewInventoryItem';
import InventoryList from '../../components/InventoryList/InventoryList';
import './InventoryPage.scss';

/* 
 * Inventory Page
 * 
 */

function InventoryPage() {
    const [showAddItem, setShowAddItem] = useState(false);

    const handleAddItemClick = () => {
        setShowAddItem(true);
    };

    const handleCancelAddItem = () => {
        setShowAddItem(false);
    };

    return (
        <div className="inventory-page">
            {showAddItem ? null : (
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

            {showAddItem ? (
                <AddNewInventoryItem onCancelAddItem={handleCancelAddItem} />
            ) : (
                <InventoryList />
            )}
        </div>        
    );
}

export default InventoryPage;