// import inventoryData from "../../Data/inventoriesData.json";
import { useEffect, useState } from "react";
import '../inventoryList/inventoryList.scss';
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";


//Inventory Page

function InventoryList() {
  //State
  const [listData, setListData] = useState([]);

  //GET request
  useEffect(() => {
    //GET array of all inventories
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "inventories")

      .then((res) => {
        //Store warehouse array in inventoryData
        const inventoryData = res.data;

        //Set listData to the array of warehouses
        setListData(inventoryData);
      });
  });

  return (
    <section className="inventory__list">
      <div className="search__wrap">
        <h1>Inventory</h1>
        <div className="input__wrap">
          <input type="search" name="search" placeholder="Search..."></input>
          <button className="search"><img src={searchIcon} alt="" /></button>
        </div>
        <button>+Add New Item</button>
      </div>

      <div className="inventory__list--mobile">
          {listData.map((item) => {
            return (
              <div className="inventory__grid--mobile">

                <div className="inventory__grid--item">
                  <div className="item__info--wrap">
                    <div>
                      <h4>Inventory Item</h4>
                      <a href="#">{item.item_name}</a>

                      <h4>Category</h4>
                      <p>{item.category}</p>
                    </div>

                    <div>
                      <h4>Status</h4>
                      <p>{item.status}</p>

                      <h4>QTY</h4>
                      <p>{item.quantity}</p>

                      <h4>Warehouse</h4>
                      <p>Manhattan</p>
                      {/* Needs dynamic var once server is hooked up */}
                    </div>
                  </div>

                  <div className="button__wrap">
                    <img src={deleteIcon} alt="Delete Warehouse Button" />
                    <img src={editIcon} alt="Edit Warehouse Button" />
                  </div>
                </div>
              </div>

            );
          })}
      </div>

      <div className="inventory__list--tabdesc">
        <div className="inventory__grid--container">
            <div className="grid__header--wrap">
              <h4>Inventory Item</h4>
              <h4>Category</h4>
              <h4>Status</h4>
              <h4>QTY</h4>
              <h4>Warehouse</h4>
              <h4>Actions</h4>
            </div>

            <div className="inventory__grid--item">
            {listData.map((item) => {
              return (
                <div>
                  <div>
                    <a>{item.item_name}</a>
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

                  <div>
                    <p>Manhattan</p>
                  </div>

                  <div className="button__wrap">
                    <img src={deleteIcon} alt="Delete Warehouse Button" />
                    <img src={editIcon} alt="Edit Warehouse Button" />
                  </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryList;
