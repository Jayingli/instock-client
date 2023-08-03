import { useParams } from 'react-router';
import '../editInventoryItem/editInventoryItem.scss';
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';


//Edit Inventory Item Component

function EditInventoryItem() {

    // State
    const [inventoryArray, setInventoryArray] = useState({});
    const [formData, setFormData] = useState({
        item_name: '',
        description: '',
        category: '',
        status: '',
        warehouse_id: '',
    });
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    //Pull down url 
    const {id} = useParams();

    //GET request to get array of inventory items
    useEffect(() => {
        //GET array of all inventory items
        const URL = "http://localhost:5050/api/";
    
        axios
          .get(`${URL}inventories/${id}`)
    
          .then((res) => {
            //Store inventory item in inventoryData
            const inventoryData = res.data;

            const newObj = {
                item_name: inventoryData.item_name,
                description: inventoryData.description,
                category: inventoryData.category,
                status: inventoryData.status,
                warehouse_id: inventoryData.warehouse_name,
        
            }
            console.log(newObj);

            setFormData(newObj);
    
            //Set listData to the inventory object
            setInventoryArray(inventoryData);

          });
      }, []);

    //GET request
    useEffect(() => {
        //GET array of all inventories
        const URL = "http://localhost:5050/api/";

        axios
        .get(URL + "inventories")

        .then((res) => {
            //Store inventory array in inventoryData
            const inventoryData = res.data;

            const categoryData = [];
            const warehouseData = [];

            //For each object in the array, if category from obj is not included in categoryData array, push category to array
            inventoryData.forEach((obj) => {
                const objCategory = obj.category;
                if(!categoryData.includes(objCategory)) {
                    categoryData.push(objCategory);
                }
            })

            //For each object in the array, if warehouse name from obj is not included in warehouseData array, push warehouse to array
            inventoryData.forEach((obj) => {
                const objWarehouse = obj.warehouse_name;
                if(!warehouseData.includes(objWarehouse)) {
                    warehouseData.push(objWarehouse);
                }
            })

            //Setting State 
            setCategories(categoryData);
            setWarehouses(warehouseData);

        });
    }, []);

    console.log(categories);
    console.log(warehouses)
    console.log(formData.warehouse_id);
    
    //PUT request to write the new info to the database?
    // axios
    // .put (

    // )

    return (
        <section className='editInventoryItem'>
            <div className="editHeader__div">
                <Link to='/inventories'><img src={backArrow} alt="Back Arrow" /></Link>
                <h1>Edit Inventory Item</h1>
            </div>

            <form action="submit">
                <div className="form__wrap">
                    <div className="details__wrap">
                        <h2>Item Details</h2>

                        <label htmlFor="item__name">Item Name</label>
                        <input type="text" name="item_name" value={formData.item_name}/>

                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" value={formData.description}></textarea>

                        <label htmlFor="category">Category</label>
                        <div className="category">
                            <select name="categories__dropdown" id="categories">
                                <option value="">{formData.category}</option>
                                {categories.map((category) => {
                                    if(category != formData.category){
                                    return (
                                        <option value="">{category}</option>
                                    )
                                }
                            })}

                            </select>
                            </div>
                    </div>

                    <div className="availability__wrap">
                        <h2>Item Availability</h2>
                        
                        <div className="status__wrap">
                            <label htmlFor="status">Status</label>
                            <div className="radio__wrap">
                                <input type="radio" name='status' value='In Stock' checked='true'/> <label htmlFor="in stock">In stock</label>
                                <input type="radio" name='status' value='Out of Stock' checked='false' /> <label htmlFor="out of stock">Out of stock</label>
                            </div>
                        </div>

                        <label htmlFor="warehouse">Warehouse</label>
                        <div className="warehouse__name">
                            <select name="warehouses__dropdown" id="warehouses">
                                <option value="">{formData.warehouse_id}</option>
                                {warehouses.map((warehouse) => {
                                    if(warehouse != formData.warehouse_id){
                                    return (
                                        <option value="">{warehouse}</option>
                                    )
                                }
                            })}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="button__wrap">
                    <button className="cancel">Cancel</button>
                    <button className="save">Save</button>
                </div>


            </form>

        </section>
    )
}

export default EditInventoryItem;