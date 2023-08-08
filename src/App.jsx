import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import InventoryDetails from './components/InventoryDetails/InventoryDetails';
import EditInventoryItem from './components/EditInventoryItem/EditInventoryItem';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import './App.scss';


/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains header, footer and defines routes for different pages
 */

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App__container">
                    <div className="App__content">
                        {/* Header Component */}
                        <Header />

                        {/* Define routes for different pages */}
                        <div className="App__page">
                            <Routes>
                                {/* Home Page */}
                                <Route path="/" element={<Navigate to="/warehouses" />} />

                                {/* Warehouses Page */}
                                <Route path="/warehouses" element={<WarehousesPage />} />

                                {/* Single Warehouse Page */}
                                <Route path="/warehouses/:id" element={<WarehouseDetails />} />

                                {/* Edit Single Warehouse */}
                                <Route path="/warehouses/:id/edit" element={<EditWarehouse />} />

                                {/* Delete Single Warehouse */}
                                <Route path="/warehouses/:id/delete" element={<WarehousesPage />} />

                                {/* Inventory Page */}
                                <Route path="/inventories" element={<InventoryPage />} />

                                {/* Single Inventory Page */}
                                <Route path="/inventories/:id" element={<InventoryDetails />} />

                                {/* Edit Single Inventory Item */}
                                <Route path="/inventories/:id/edit" element={<EditInventoryItem />} />

                                {/* Delete Single Inventory Item */}
                                <Route path="/inventories/:id/delete" element={<InventoryPage />} />

                                {/* Catch-all to redirect to Home Page */}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    </div>
            
                    {/* Footer Component */}
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;