import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import forwardArrow from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./WarehouseInventoryList.scss";

//Warehouse Inventory List Component

function WarehouseInventoryList() {
  //State
  const [inventoryfilteredData, setInventoryfilteredData] = useState([]);
  const [warehouseName, setWarehouseName] = useState("");

  //GET current ID
  const { id } = useParams();

  //GET request
  useEffect(() => {
    // to fetch warehouse data
    // 5050
    const URL = `http://localhost:5050/api/warehouses/${id}`;

    axios
      .get(URL)

      .then((res) => {
        //Store warehouse name data in a warehouseNameData variable
        const warehouseNameData = res.data[0].warehouse_name;
        console.log(warehouseNameData);

        //Set WarehouseName to the string of warehouseNameData
        setWarehouseName(warehouseNameData);
      });
  },[]);

  //GET request
  useEffect(() => {
    // to fetch inventory data
    const URL = `http://localhost:5050/api/inventories`;

    axios
      .get(URL)

      .then((res) => {
        //Store inventory data in inventoryData variable
        const inventoryData = res.data;
        console.log(inventoryData);

        //Store the filtered Inventory Data in filteredData variable
        const filteredData = inventoryData.filter((obj) => {
          return obj.warehouse_name === warehouseName;
        });

        console.log(filteredData);
        setInventoryfilteredData(filteredData);
      });
  },[]);
  return (
    <section className="warehouseinventory__list">
      <div className="inventory__list--mobile">
        {inventoryfilteredData.map((item) => {
          return (
            <div className="inventory__grid--mobile" key={item.id}>
              <div className="inventory__grid--item">
                <div className="item__info--wrap">
                  <div className="inventory__div">
                    <h4>Inventory Item</h4>
                    <div className="inventory__name">
                      <Link to={`/inventories/${item.id}`}>
                        <p>
                          {item.item_name}
                          <img src={forwardArrow} alt="forward arrow" />
                        </p>
                      </Link>
                    </div>

                    <h4>Category</h4>
                    <p>{item.category}</p>
                  </div>

                  <div>
                    <h4>Status</h4>
                    <p>{item.status}</p>

                    <h4>QTY</h4>
                    <p>{item.quantity}</p>

                    {/* <h4>Warehouse</h4>
                    <p>{item.warehouse_name}</p> */}

                    {/* Needs dynamic var once server is hooked up */}
                  </div>
                </div>

                <div className="button__wrap">
                  <img src={deleteIcon} alt="Delete Warehouse Button" />
                  <Link to={`/inventories/${item.id}`}>
                    <img src={editIcon} alt="Edit Warehouse Button" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="inventory__list--tabdesc">
        <div className="inventory__grid--container">
          <div className="grid__header--wrap">
            <div>
              <h4>Inventory Item</h4>
              <img src={sortIcon} alt="sort icon" />
            </div>

            <div>
              <h4>Category</h4>
              <img src={sortIcon} alt="sort icon" />
            </div>

            <div>
              <h4>Status</h4>
              <img src={sortIcon} alt="sort icon" />
            </div>

            <div>
              <h4>QTY</h4>
              <img src={sortIcon} alt="sort icon" />
            </div>

            {/* <div>
              <h4>Warehouse</h4>
              <img src={sortIcon} alt="sort icon" />
            </div> */}

            <div>
              <h4>Actions</h4>
            </div>
          </div>

          {inventoryfilteredData.map((item) => {
            return (
              <div className="inventory__grid--item" key={item.id}>
                <div className="inventory__item">
                  <Link to={`/inventories/${item.id}`}>
                    <p>
                      {item.item_name}
                      <img src={forwardArrow} alt="forward arrow" />
                    </p>
                  </Link>
                </div>

                <div>
                  <p>{item.category}</p>
                </div>

                <div>
                  <p>{item.status}</p>
                </div>

                <div>
                  <p>{item.quantity}</p>
                </div>

                {/* <div>
                  <p>{item.warehouse_name}</p>
                </div> */}

                <div className="button__wrap">
                  <img src={deleteIcon} alt="Delete Warehouse Button" />
                  <Link to={`/inventories/${item.id}`}>
                    <img src={editIcon} alt="Edit Warehouse Button" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WarehouseInventoryList;