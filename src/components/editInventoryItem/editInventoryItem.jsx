import { useParams } from 'react-router';
import '../editInventoryItem/editInventoryItem.scss';
import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';



//Edit Inventory Item Component

function EditInventoryItem() {

    //Pull down url 
    const objId = useParams();

    return (
        <section className='editInventoryItem'>
            <div className="editHeader__div">
                <Link to='/inventories'><img src={backArrow} alt="Back Arrow" /></Link>
                <h1>Edit Inventory Item</h1>
            </div>

            <form action="submit">
                <div className="details__wrap">
                    <h2>Item Details</h2>

                    <label htmlFor="item__name">Item Name</label>
                    <input type="text" />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"></textarea>

                    <label htmlFor="category">Category</label>
                    <div className="category__dropdown"></div>
                </div>

                <div className="availability__wrap">
                    <h2>Item Availability</h2>
                    
                    <div className="status__wrap">
                        <label htmlFor="status">Status</label>
                        <button></button>
                        <button></button>
                    </div>

                    <label htmlFor="warehouse">Warehouse</label>
                    <div className="warehouse__dropdown"></div>
                </div>

                <div className="button__wrap">
                    <button className="cancel"></button>
                    <button className="save"></button>
                </div>


            </form>

        </section>
    )
}

export default EditInventoryItem;