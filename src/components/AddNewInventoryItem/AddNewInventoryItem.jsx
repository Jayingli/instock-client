import { Link } from 'react-router-dom';
import InventoryForm from '../InventoryForm/InventoryForm';
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg';
import './AddNewInventoryItem.scss'

function AddNewInventoryItem() {
    return (
        <div className="add-inventory">
            <div className="add-inventory__heading">
                <Link to='/inventories'>
                    <img className="add-inventory__icon" src={backArrowIcon} alt="Back Arrow Icon" />
                </Link>
                <h2 className="add-inventory__title">Add New Inventory Item</h2>
            </div>
        
            <InventoryForm />
        </div>
    );
};

export default AddNewInventoryItem;