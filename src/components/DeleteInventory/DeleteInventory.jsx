import { Link, useParams } from 'react-router-dom';
import closeIcon from '../../assets/icons/close-24px.svg';
import axios from 'axios';
import './DeleteInventory.scss';


//Delete Inventory Component

function DeleteInventory({ array, page, deleteItemHandler}) {

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
        })

        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='delete__component'>
            <Link to='/inventories'><img src={closeIcon} alt="Close Icon" onClick={deleteItemHandler} /></Link>
            <div className="delete__prompt">
                <h1>Delete {obj.item_name} {page == 'inventory' ? 'inventory item' : 'warehouse'}?</h1>
                <p>Please confirm that you'd like to delete {obj.item_name} from the {page == 'inventory' ? 'inventory list' : 'list of warehouses'}.
                    You won't be able to undo this action.</p>

                <div className="button__wrap">
                    <button className="cancel" onClick={deleteItemHandler}>Cancel</button>
                    <button className="delete" onClick={deleteHandler}>Delete</button>
                </div>
            </div>
        </div>
    )
}

// function DeleteInventory({ array, itemId, deleteItemHandler}) {

//     const {id} = useParams();

//     //Find item by id to us its name in the message below
//     function findItem(item) {
//         return item.id == itemId;
//     }

//     const obj = array.find(findItem);

//     console.log(obj);

//     //DELETE request
//     const deleteHandler = (e) => {
//         e.preventDefault();

//         axios
//         .delete(`http://localhost:5050/api/inventories/${itemId}`)

//         .then((res) => {
//             console.log(`deleted post with id ${itemId}`);
//             deleteItemHandler();
//         })

//         .catch((err) => {
//             console.log(err);
//         })
//     }

//     return(
//         <div className='delete__component'>
//             <Link to='/inventories'><img src={closeIcon} alt="Close Icon" onClick={deleteItemHandler} /></Link>
//             {obj && (
//             <div className="delete__prompt">
//                 <h1>Delete {obj?.item_name} {itemId ? 'inventory item' : 'warehouse'}?</h1>
//                 <p>Please confirm that you'd like to delete {obj.item_name} from the {itemId ? 'inventory list' : 'list of warehouses'}.
//                     You won't be able to undo this action.</p>

//                 <div className="button__wrap">
//                     <button className="cancel" onClick={() => deleteItemHandler(null)}>Cancel</button>
//                     <button className="delete" onClick={deleteHandler}>Delete</button>
//                 </div>
//             </div>
//             )}
//         </div>
//     )
// }

export default DeleteInventory;



// function DeleteInventory({ history, listData, itemId, onCancelDelete }) {
//     const obj = listData.find((item) => item.id === itemId);
  
//     const deleteHandler = () => {
//       axios
//         .delete(`http://localhost:5050/api/inventories/${itemId}`)
//         .then((response) => {
//           console.log(`deleted post with id ${itemId}`);
//           // Perform any necessary actions after delete
//           // ...
//           // Go back to the previous page after successful delete
//           history.goBack();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     };
  
//     return (
//       <div className="delete__modal">
//         {/* Modal content */}
//         <div className="delete__component">
//           <Link to="/inventories">
//             <img src={closeIcon} alt="Close Icon" />
//           </Link>
//           <div className="delete__prompt">
//             <h1>Delete {obj.item_name} inventory item?</h1>
//             <p>
//               Please confirm that you'd like to delete {obj.item_name} from the
//               inventory list. You won't be able to undo this action.
//             </p>
  
//             <div className="button__wrap">
//               <button className="cancel" onClick={onCancelDelete}>
//                 Cancel
//               </button>
//               <button className="delete" onClick={deleteHandler}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default DeleteInventory;