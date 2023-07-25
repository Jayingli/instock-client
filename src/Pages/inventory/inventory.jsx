import "../inventory/inventory.scss";
import inventoryData from "../../Data/inventoriesData.json";
import { useEffect, useState } from "react";


//Inventory Page

function Inventory() {
  //State
//   const [listData, setListData] = useState();

  //GET request
//   useEffect(() => {
//     //GET array of all inventories
//     const URL = "http://localhost:5050/api/";

//     axios
//       .get(URL + "inventories")

//       .then((res) => {
//         //Store warehouse array in inventoryData
//         const inventoryData = res.data;

//         //Set listData to the array of warehouses
//         setListData(inventoryData);
//       });
//   });

  return (
    <section className="inventory">
      <div className="search__wrap">
        <h1>Inventory</h1>
        <input type="text" name="search" placeholder="Search..." />
        <button>+Add New Item</button>
      </div>

      <div className="inventory__list--mobile">
        <div className="inventory__grid--mobile">
          {inventoryData.map((item) => {
            return (
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
                  <img src="#" alt="" />
                  <img src="#" alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="inventory__list--tabdesc">
        <div className="inventory__grid--item">
          <h4>Inventory Item</h4>
          <h4>Category</h4>
          <h4>Status</h4>
          <h4>QTY</h4>
          <h4>Warehouse</h4>
          <h4>Actions</h4>

          <a>Television link</a>
          <p>Electronics</p>
          <p>Status</p>
          <p>500</p>
          <p>Manhattan</p>
          <div>
            <img src="#" alt="" />
            <img src="#" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inventory;
