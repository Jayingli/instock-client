import '../inventory/inventory.scss';
//Inventory Page

function Inventory() {
    return(
        <section className='inventory'>
            <div className="search__wrap">
                <h1>Inventory</h1>
                <input type="text" name='search' placeholder='Search...' />
                <button>+Add New Item</button>
            </div>

            <table className="inventory__table">
                <tbody>
                    <tr>
                        <th>Inventory Item</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>QTY</th>
                        <th>Warehouse</th>
                        <th>Actions</th>
                    </tr>

                    <tr>
                        <td>Television link</td>
                        <td>Electronics</td>
                        <td>Status</td>
                        <td>500</td>
                        <td>Manhattan</td>
                        <td>
                            <img src="#" alt="" />
                            <img src="#" alt="" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Inventory;