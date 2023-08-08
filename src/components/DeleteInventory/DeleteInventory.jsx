import { Link, useParams } from 'react-router-dom';
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './DeleteInventory.scss';

/*
 * Delete Inventory Component
 * - Represents the delete inventory modal that asks for confirmation
 * - Can cancel, delete or close
 */

function DeleteInventory({ array, page, deleteItemHandler, updateListAfterDeletion}) {

    const {id} = useParams();

    //Find item by id to us its name in the message below
    function findItem(item) {
        return item.id == id;
    }

    const obj = array.find(findItem);

    console.log(obj);
    

    //DELETE request
    const deleteHandler = (e) => {
        e.preventDefault();

        axios
        .delete(`http://localhost:5050/api/inventories/${id}`)

        .then((res) => {
            console.log(`deleted post with id ${id}`);
            deleteItemHandler();
            updateListAfterDeletion(id); // Call the function to update the list after deletion
        })

        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="delete-inventory">
            <div className="delete-inventory__container">
                <Link to='/inventories'><img className="delete-inventory__close" src={closeIcon} alt="Close Icon" onClick={deleteItemHandler}/></Link>
                <div className="delete-inventory__content">
                    <div>
                        <h2 className="delete-inventory__title">
                            Delete {obj.item_name} {page == 'inventory' ? 'inventory item' : 'warehouse'}?
                        </h2>
                        <p className="delete-inventory__paragraph">
                            Please confirm that you'd like to delete {obj.item_name} from the {page == 'inventory' ? 'inventory list' : 'list of warehouses'}.
                            You won't be able to undo this action.
                        </p>
                    </div>
                </div>
                <div className="delete-inventory__buttons">
                    <Button variant="secondary" text="Cancel" onClick={deleteItemHandler}/>
                    <Button variant="delete" text="Delete" onClick={deleteHandler}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteInventory;