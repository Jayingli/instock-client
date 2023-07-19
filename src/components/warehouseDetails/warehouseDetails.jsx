import '../warehouseDetails/warehouseDetails.scss';

//WarehouseDetails Component

function WarehouseDetails() {
    return(
        <div className='warehouse__details'>
            <div className='title__wrap'>
                <img src="" alt="Back Arrow" />
                <h1>Washington</h1>
                <button>Edit</button>
            </div>

            <div className="detail__wrap">
                <h4>Warehouse Address:</h4>
                <p>33 Pearl Street SW, Washington, USA</p>

                <div className="contact__wrap">
                    <div className="name__wrap">
                        <h4>Contact Name:</h4>
                        <p>Graeme Lyon</p>
                        <p>Warehouse Manager</p>
                    </div>
                    
                    <div className="info__wrap">
                        <h4>Contact Information:</h4>
                        <p>+1 647 504-0911</p>
                        <a href="mailto: glyon@instock.com">glyon@instock.com</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WarehouseDetails;