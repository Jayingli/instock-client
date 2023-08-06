import { Link, useParams } from "react-router-dom";
import "../deleteWarehouse/deleteWarehouse.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

//Delete Warehouse Component

function DeleteWarehouse({ page, deleteItemHandler }) {
  //State
  const { id } = useParams();
  const [listData, setListData] = useState([]);
  const [wobj, setWobj] = useState([]);

  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "warehouses")

      .then((res) => {
        //Store warehouse array in warehouseData
        const warehouseData = res.data;
        const obj = warehouseData.find((warehouse) => warehouse.id == id);
        setWobj(obj);

        //Set listData to the array of warehouses
        setListData(warehouseData);
      });
  }, []);

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
          Delete {wobj.warehouse_name}{" "}
          {page == "inventory" ? "inventory item" : "warehouse"}?
        </h1>
        <p>
          Please confirm that you'd like to delete {wobj.warehouse_name} from
          the {page == "inventory" ? "inventory list" : "list of warehouses"}.
          You won't be able to undo this action.
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
