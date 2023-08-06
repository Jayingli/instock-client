import { Link, useParams } from "react-router-dom";
import "../deleteWarehouse/deleteWarehouse.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";

//Delete Item Component

function DeleteWarehouse({ obj, page, deleteItemHandler }) {
  //State
  const { id } = useParams();

  //Find item by id to us its name in the message below
  function findWarehouse(item) {
    return item.id == id;
  }

  //   const obj = array.find(findWarehouse);

  console.log(obj);

  const deleteHandler = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5050/api/warehouses/${id}`)

      .then((res) => {
        console.log(`deleted post with id ${id}`);
        deleteItemHandler();
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="delete__component">
      <Link to="/inventories">
        <img src={closeIcon} alt="Close Icon" onClick={deleteItemHandler} />
      </Link>
      <div className="delete__prompt">
        <h1>
          Delete {obj} {page == "inventory" ? "inventory item" : "warehouse"}?
        </h1>
        <p>
          Please confirm that you'd like to delete {obj} from the{" "}
          {page == "inventory" ? "inventory list" : "list of warehouses"}. You
          won't be able to undo this action.
        </p>

        <div className="button__wrap">
          <button className="cancel" onClick={deleteItemHandler}>
            Cancel
          </button>
          <button className="delete" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWarehouse;
