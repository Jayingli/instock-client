import { Link } from 'react-router-dom';
import '../deleteItem/deleteItem.scss';
import closeIcon from '../../assets/icons/close-24px.svg';


//Delete Item Component

function DeleteItem() {

    return(
        <div className='delete__component'>
            <Link><img src={closeIcon} alt="" /></Link>
            <div className="delete__prompt">
                <h1>Delete 'SPECIFIC INVENTORY ITEM/SPECIFIC WAREHOUSE' + 'inventory item/warehouse'?</h1>
                <p>Please confirm that you'd like to delete 'SPECIFIC INVENTORY ITEM/SPECIFIC WAREHOUSE' from the 'WAREHOUSE/INVENTORY' list.</p>
                <p>You won't be able to undo this action.</p>

                <div className="button__wrap">
                    <button className="cancel">Cancel</button>
                    <button className="delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem;