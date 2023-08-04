import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../components/Button/Button';
import './WarehousesPage.scss';

function WarehousesPage() {
    // return (
    //     // <div className="warehouses">
    //     //     <WarehouseList warehouseData={warehouseData}/>
    //     // </div>
    //     <section id="warehouse__main">
    //         <div className="warehouse__list">
    //             <WarehouseList warehouseData={warehouseData}/>
    //         </div>
    //     </section>
    // );

    return (
        <div className="warehouses-page">
            <div className="warehouses-page__header">
                <h1 className="warehouses-page__title">Warehouses</h1>
                <div className="warehouses-page__actions">
                    <SearchBar />
                    <Button variant="primary" text="+ Add New Warehouse"/>
                </div>
            </div>

            
        </div>   
    );
    
};

export default WarehousesPage;