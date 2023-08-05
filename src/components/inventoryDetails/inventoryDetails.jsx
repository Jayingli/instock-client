import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../inventoryDetails/inventoryDetails.scss";
import axios from "axios";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

//Inventory Details Component

function InventoryDetails() {
  //State
  const [details, setDetails] = useState([]);

  //Get current id
  const { id } = useParams();

  //GET request
  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:8000/api/";

    axios
      .get(URL + "inventories")

      .then((res) => {
        //Store warehouse array in warehouseData
        const inventoryData = res.data;

        //Set details to the array of warehouses
        setDetails(inventoryData);
      });
  }, []);

  return (
    <div className="inventory__details">
      {details.map((item) => {
        // If item id is equal to url id, build component below with that data
        if (item.id == id) {
          return (
            <div>
              <div className="title__wrap">
                <div className="inventory__item">
                  <Link to="/inventories">
                    <img src={backArrow} alt="Back Arrow" />
                  </Link>

                  <h1>{item.item_name}</h1>
                </div>

                <div className="edit">
                  <Link to={`/inventories/${item.id}/edit`}>
                    <img src={editIcon} alt="edit icon" />

                    <p>Edit</p>
                  </Link>
                </div>
              </div>

              <div className="detail__wrap">
                <div className="detail__header">
                  <h4>Item Description:</h4>
                  <p>{item.description}</p>

                  <h4>Category:</h4>
                  <p>{item.category}</p>
                </div>

                <div className="status__wrap">
                  <div className="statquant__wrap">
                    <div>
                      <h4>Status:</h4>
                      <p className={item.status}>{item.status}</p>
                    </div>

                    <div>
                      <h4>Quantity:</h4>
                      <p>{item.quantity}</p>
                    </div>
                  </div>

                  <div>
                    <h4>Warehouse:</h4>
                    <p>{item.warehouse_name}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default InventoryDetails;
