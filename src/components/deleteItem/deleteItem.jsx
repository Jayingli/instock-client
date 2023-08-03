import { Link, useParams } from 'react-router-dom';
import '../deleteItem/deleteItem.scss';
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';


//Delete Item Component

function DeleteItem({obj, page}) {

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
        <div className='delete__component' property='hidden'>
            <Link><img src={closeIcon} alt="" /></Link>
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