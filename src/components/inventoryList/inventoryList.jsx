import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../inventoryList/inventoryList.scss";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import SearchHeader from "../searchHeader/searchHeader";
import forwardArrow from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import DeleteItem from "../deleteItem/deleteItem";

//Inventory List Component

function InventoryList() {
  //State
  const [listData, setListData] = useState([]);
  const [deleteVisibility, setDeleteVisibility] = useState(false);

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
  }, []);

  const deleteItemHandler = (e) => {

    setDeleteVisibility(!deleteVisibility);
      
    }

  return (
    <section className="inventory__list">
      <SearchHeader obj="item" page="Inventory" />
      <div className="inventory__list--mobile">
        {listData.map((item) => {
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
                    <div className={item.status == 'In Stock' ? 'inStock' : 'outOfStock'}>
                      <p>{item.status}</p>
                    </div>
                    

                    <h4>QTY</h4>
                    <p>{item.quantity}</p>

                    <h4>Warehouse</h4>
                    <p>{item.warehouse_name}</p>

                  </div>
                </div>

                <div className="button__wrap">
                  <Link to={`/inventories/${item.id}/delete`} >
                    <img src={deleteIcon} alt="Delete Warehouse Button" onClick={deleteItemHandler}/>
                  </Link>
                  <Link to={`/inventories/${item.id}/edit`}>
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

            <div>
              <h4>Warehouse</h4>
              <img src={sortIcon} alt="sort icon" />
            </div>

            <div>
              <h4>Actions</h4>
            </div>
          </div>

          {listData.map((item) => {
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

                <div className={item.status == 'In Stock' ? 'inStock' : 'outOfStock'}>
                  <p >{item.status}</p>
                </div>

                <div>
                  <p>{item.quantity}</p>
                </div>

                <div>
                  <p>{item.warehouse_name}</p>
                </div>

                <div className="button__wrap">
                  <Link to={`/inventories/${item.id}/delete`}>
                    <img src={deleteIcon} alt="Delete Warehouse Button" onClick={deleteItemHandler}/>
                  </Link>
                  <Link to={`/inventories/${item.id}/edit`}>
                    <img src={editIcon} alt="Edit Warehouse Button" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {deleteVisibility && 
        <div className="delete__component--wrap">
            <DeleteItem 
                  obj={listData.item_name}
                  page="inventory"
                  visibility="hidden"
                  deleteItemHandler={deleteItemHandler}
                  />
          </div>
      }

    </section>
  );
}

export default InventoryList;
