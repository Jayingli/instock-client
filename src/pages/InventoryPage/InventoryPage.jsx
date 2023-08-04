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
    return (
        <div className="inventory-page">
            <div className="inventory-page__header">
                <h1 className="inventory-page__title">Inventory</h1>
                <div className="inventory-page__actions">
                    <SearchBar />
                    <Button variant="primary" text="+ Add New Item"/>
                </div>
            </div>

            <InventoryList />
        </div>        
    );
}

export default InventoryPage;