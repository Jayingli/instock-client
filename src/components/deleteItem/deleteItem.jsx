import { Link, useParams } from 'react-router-dom';
import '../deleteItem/deleteItem.scss';
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';


//Delete Item Component

function DeleteItem({obj, page, visibility, deleteItemHandler}) {

    const {id} = useParams();

    const deleteHandler = (e) => {
        e.preventDefault();

        axios
        .delete(`http://localhost:5050/api/inventories/${id}`)

        .then((res) => {
            console.log(`deleted post with id ${id}`);
        })

        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className='delete__component' visibility={visibility}>
            <Link to='/inventories'><img src={closeIcon} alt="Close Icon" onClick={deleteItemHandler} /></Link>
            <div className="delete__prompt">
                <h1>Delete {obj} {page == 'inventory' ? 'inventory item' : 'warehouse'}?</h1>
                <p>Please confirm that you'd like to delete {obj} from the {page == 'inventory' ? 'inventory list' : 'list of warehouses'}.
                    You won't be able to undo this action.</p>

                <div className="button__wrap">
                    <button className="cancel">Cancel</button>
                    <button className="delete" onClick={deleteHandler}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem;