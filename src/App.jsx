import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
// import InventoryPage from './pages/InventoryPage/InventoryPage';
import './App.scss';
import Warehouse from './Pages/warehouse/warehouse';

/*
App.jsx
- Represents the main component of the application
- Contains header, footer and defines routes for different pages
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
                    {/* <Route path="/warehouses" element={<WarehousesPage />} /> */}

                    {/* Single Warehouse Page */}
                    {/* <Route path="/warehouses/:id" element={<WarehousesPage />} /> */}

                    {/* Inventories of Individual Warehouse Page*/}
                    {/* <Route path="/warehouses/:id/inventories" element={<WarehousesPage />} /> */}

                    {/* Inventory Page */}
                    {/* <Route path="/inventories" element={<InventoryPage />} /> */}

                    {/* Single Inventory Page */}
                    {/* <Route path="/inventories/:id" element={<InventoryPage />} /> */}

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