import { Link, useParams } from 'react-router-dom';
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './DeleteWarehouse.scss';

/*
 * Delete Warehouse Component
 * - Represents the delete warehouse modal that asks for confirmation
 * - Can cancel, delete or close
 */

function DeleteWarehouse({ array, page, deleteItemHandler, updateListAfterDeletion}) {

    const {id} = useParams();

    //Find item by id to us its name in the message below
    function findWarehouse(warehouse) {
        return warehouse.id == id;
    }

    const obj = array.find(findWarehouse);

    console.log("Found Warehouse:", obj);
    

    //DELETE request
    const deleteHandler = (e) => {
        e.preventDefault();

        axios
        .delete(`http://localhost:5050/api/warehouses/${id}`)

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
        <div className="delete-warehouse">
            <div className="delete-warehouse__container">
                <Link to='/warehouses'><img className="delete-warehouse__close" src={closeIcon} alt="Close Icon" onClick={deleteItemHandler}/></Link>
                <div className="delete-warehouse__content">
                    <div>
                        <h2 className="delete-warehouse__title">
                            Delete {obj.warehouse_name} {page == 'inventory' ? 'inventory item' : 'warehouse'}?
                        </h2>
                        <p className="delete-warehouse__paragraph">
                            Please confirm that you'd like to delete {obj.warehouse_name} from the {page == 'inventory' ? 'inventory list' : 'list of warehouses'}.
                            You won't be able to undo this action.
                        </p>
                    </div>
                </div>
                <div className="delete-warehouse__buttons">
                    <Button variant="secondary" text="Cancel" onClick={deleteItemHandler}/>
                    <Button variant="delete" text="Delete" onClick={deleteHandler}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarehouse;