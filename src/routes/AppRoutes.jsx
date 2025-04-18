// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";
import OrganizationProfile from "../pages/organizationProfile/OrganizationProfile";
import MainLayout from "../component/layout/MainLayout";
import AddItems from "../pages/Items/AddItems";
import ViewItems from "../pages/Items/viewItems/ViewItems";
import ItemList from "../pages/Items/itemlist/itemlist";
import Addcompositeitems from "../pages/Items/compositeitems/Addcompositeitems";
import ViewCompositeitem from "../pages/Items/compositeitems/ViewCompositeitem/ViewCompositeitem";
import Compositeitemlist from "../pages/Items/compositeitems/Compositeitemlist/Compositeitemlist";
import AddpriceList from "../pages/Items/priceList/AddpriceList";
import PriceList from "../pages/Items/priceList/PriceList";
import InventoryAdjustmentList from "../pages/Items/InventoryAdjustmentList/InventoryAdjustmentList";
import ItemsGroupList from "../pages/Items/itemsGroupList/itemsGroupList";
import ItemGroupAdd from "../pages/Items/itemsGroupList/ItemGroupAdd";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages - No Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/OrganizationProfile" element={<OrganizationProfile />} />

      <Route
        path="/ItemList"
        element={
          <MainLayout>
            <ItemList />
          </MainLayout>
        }
      />
      <Route
        path="ItemList/AddItems"
        element={
          <MainLayout>
            <AddItems />
          </MainLayout>
        }
      />
      <Route
        path="/ViewItems"
        element={
          <MainLayout>
            <ViewItems />
          </MainLayout>
        }
      />

      <Route
        path="/Compositeitemlist"
        element={
          <MainLayout>
            <Compositeitemlist />
          </MainLayout>
        }
      />
      <Route
        path="/Addcompositeitems"
        element={
          <MainLayout>
            <Addcompositeitems />
          </MainLayout>
        }
      />

      <Route
        path="/ViewCompositeitem"
        element={
          <MainLayout>
            <ViewCompositeitem />
          </MainLayout>
        }
      />
      {/* //////------------------- */}
      <Route
        path="/ItemsGroupList"
        element={
          <MainLayout>
            <ItemsGroupList />
          </MainLayout>
        }
      />

      <Route
        path="/ItemGroupAdd"
        element={
          <MainLayout>
            <ItemGroupAdd />
          </MainLayout>
        }
      />

      <Route
        path="/price-lists/create"
        element={
          <MainLayout>
            <AddpriceList />
          </MainLayout>
        }
      />

      <Route
        path="/PriceList"
        element={
          <MainLayout>
            <PriceList />
          </MainLayout>
        }
      />

      <Route
        path="/Inventory_AdjustmentList"
        element={
          <MainLayout>
            <InventoryAdjustmentList />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
