import { useEffect, useState } from "react";
import "../warehouseDetails/warehouseDetails.scss";
import axios from "axios";
import { useParams } from "react-router";

//WarehouseDetails Component

function WarehouseDetails() {
  //State
  const [details, setDetails] = useState([]);

  //Get current id
  const { ID } = useParams();
  console.log(ID);

  //GET request
  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "warehouses")

      .then((res) => {
        //Store warehouse array in warehouseData
        const warehouseData = res.data;

        //Set listData to the array of warehouses
        setDetails(warehouseData);
      });
  }, []);

  return (
    <div className="warehouse__details">
      {details.map((warehouse) => {

        if (warehouse.id == ID.id){
            return (
                <div>
                <div className="title__wrap">
                    <img src="" alt="Back Arrow" />
                    <h1>{warehouse.warehouse_name}</h1>
                    <button>Edit</button>
                </div>

                <div className="detail__wrap">
                    <h4>Warehouse Address:</h4>
                    <p>{warehouse.address}</p>

                    <div className="contact__wrap">
                    <div className="name__wrap">
                        <h4>Contact Name:</h4>
                        <p>{warehouse.contact_name}</p>
                        <p>{warehouse.contact_position}</p>
                    </div>

                    <div className="info__wrap">
                        <h4>Contact Information:</h4>
                        <p>{warehouse.contact_phone}</p>
                        <a href={`mailto: ${warehouse.contact_email}`}>{warehouse.contact_email}</a>
                    </div>
                    </div>
                </div>
                </div>
            )}
      })}
    </div>
  );
}

export default WarehouseDetails;
