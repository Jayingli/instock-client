import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import Warehouse from './Pages/warehouse/warehouse';
import Inventory from './Pages/inventory/inventory';
import WarehouseDetails from './components/warehouseDetails/warehouseDetails';
import EditInventoryItem from './components/editInventoryItem/editInventoryItem';
import InventoryDetails from './components/inventoryDetails/inventoryDetails';
/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains header, footer and defines routes for different pages
 */

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* Header Component */}
                <Header />

                {/* Define routes for different pages */}
                <Routes>
                    {/* Home Page */}
                    <Route path="/" element={<Warehouse />} />

                    {/* Warehouses Page */}
                    <Route path="/warehouses" element={<Warehouse />} />

                    {/* Single Warehouse Page */}
                    <Route path="/warehouses/:id" element={<WarehouseDetails />} />

                    {/* Inventories of Individual Warehouse Page*/}
                    {/* <Route path="/warehouses/:id/inventories" element={<Warehouse />} /> */}

                    {/* Inventory Page */}
                    <Route path="/inventories" element={<Inventory />} />

                    {/* Single Inventory Page */}
                    <Route path="/inventories/:id" element={<InventoryDetails />} />

                    {/* Edit Single Inventory Item */}
                    <Route path="/inventories/:id/edit" element={<EditInventoryItem />} />

                    {/* Delete Single Inventory Item */}
                    <Route path="/inventories/:id/delete" element={<Inventory />} />


                    {/* Catch-all to redirect to Home Page */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* Footer Component */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;