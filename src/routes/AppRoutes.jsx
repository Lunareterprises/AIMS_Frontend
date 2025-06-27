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
import CustomersList from "../pages/sales/CustomersList";
import CustomersAdd from "../pages/sales/CustomersAdd";
import CustomerView from "../pages/sales/CustomerView";
import Addqoutes from "../pages/sales/quotes/Addqoutes";
import CustomViewBuilder from "../component/items/itemslist/Custom_View";
import CustomerFileImport from "../component/sales/customers/sort/importCustomer/CustomerFileImport";
import ImportLayout from "../component/sales/customers/sort/importCustomer/ImportLayout";
import FieldMappingPage from "../component/sales/customers/sort/importCustomer/FieldMappingPage";
import SettingsIndex from "../pages/settings/SettingsIndex";
import CustomersAndVendorsIndex from "../pages/settings/customersAndVendors/CustomersAndVendorsIndex";
import NewCustomFieldContacts from "../pages/settings/customersAndVendors/NewCustomFieldContacts";
import CustomFieldsSettings from "../pages/settings/customersAndVendors/CustomFieldsSettings";
import CustomLinkForm from "../pages/settings/customersAndVendors/CustomLinkForm";
import CustomerDeatilesPage from "../component/sales/customers/customerDetailedPage/CustomerDeatilesPage";
import HomeIndex from "../component/home/HomeIndex";
import BankingIndex from "../component/banking/BankingIndex";
import QuoteForm from "../component/sales/quotes/createNew/QuoteForm";
import QuotesDetailedPage from "../component/sales/quotes/QuotesDetailedPage";
import InvoicesLayout from "../component/sales/invoices/InvoicesLayout";
import InvoiceForm from "../component/sales/invoices/createNew/InvoiceForm";
import PaymentReceivedLayout from "../component/sales/paymentReceived/PaymentReceivedLayout";
import PaymentRecevibleForm from "../component/sales/paymentReceived/createNew/PaymentRecevibleForm";
import PaymentReceipt from "../component/sales/paymentReceived/detailedPage/PaymentReceipt";
import VendorLayout from "../component/purchase/vendor/VendorLayout";
import ExpensesLayout from "../component/purchase/expenses/ExpensesLayout";
import ExpenseForm from "../component/purchase/expenses/createNew/ExpenseForm";
import ExpenseDetailedPage from "../component/purchase/expenses/ExpenseDetailedPage";
import ManualJournalscreteForm from "../component/accounts/manualJournal/createNew/ManualJournalscreteForm";
import ManualJournalsLayout from "../component/accounts/manualJournal/ManualJournalsLayout";
import ManualJouralsDetailedPage from "../component/accounts/manualJournal/ManualJouralsDetailedPage";
import ChartOfAccountsLayout from "../component/accounts/chartOfAccount/ChartOfAccountsLayout";
import ChartOfAccountDetailedPage from "../component/accounts/chartOfAccount/ChartOfAccountDetailedPage";
import PurchaseReceivesLayout from "../component/purchase/purchaseReceives/PurchaseReceivesLayout";
import PurcahseReceivesForm from "../component/purchase/purchaseReceives/createNew/PurcahseReceivesForm";
import PurchaseReceiveDetailedPage from "../component/purchase/purchaseReceives/PurchaseReceiveDetailedPage";
import CustomViewForm from "../component/sales/customers/filterMenus/CustomViewForm";

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
        path="/home"
        element={
          <MainLayout>
            <HomeIndex />
          </MainLayout>
        }
      />
      <Route
        path="/banking"
        element={
          <MainLayout>
            <BankingIndex />
          </MainLayout>
        }
      />
      <Route
        path="/ItemList"
        element={
          <MainLayout>
            <ItemList />
          </MainLayout>
        }
      />
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
        path="/detail_product"
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
        path="/View_Composite_item"
        element={
          <MainLayout>
            <ViewCompositeitem />
          </MainLayout>
        }
      />

      <Route
        path="/CustomViewBuilder"
        element={
          <MainLayout>
            <CustomViewBuilder />
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
      {/* //-------sale-------------- */}

      <Route
        path="/CustomViewForm"
        element={
          <MainLayout>
            <CustomViewForm />
          </MainLayout>
        }
      />
      <Route
        path="/import/map-fields"
        element={
          <MainLayout>
            <FieldMappingPage />
          </MainLayout>
        }
      />
      <Route
        path="/CustomerDetailedPage/:id"
        element={
          <MainLayout>
            <CustomerDeatilesPage />
          </MainLayout>
        }
      />
      <Route
        path="/CustomersList"
        element={
          <MainLayout>
            <CustomersList />
          </MainLayout>
        }
      />
      <Route
        path="/import/customers"
        element={
          // <MainLayout>
            <ImportLayout />
          // </MainLayout>
        }
      />
      <Route
        path="/CustomersAdd_Details"
        element={
          <MainLayout>
            <CustomersAdd />
          </MainLayout>
        }
      />

      <Route
        path="/CustomerView"
        element={
          <MainLayout>
            <CustomerView />
          </MainLayout>
        }
      />

      {/* //---------------------------Quotes-------------?? */}

      <Route
        path="/Addqoutes"
        element={
          <MainLayout>
            <Addqoutes />
          </MainLayout>
        }
      />
      <Route
        path="/QuotesForm"
        element={
          <MainLayout>
            <QuoteForm />
          </MainLayout>
        }
      />
      <Route
        path="/QuotesDetailedPage/:id"
        element={
          <MainLayout>
            <QuotesDetailedPage />
          </MainLayout>
        }
      />


      {/*//---------------------------settings-------------??  */}
      <Route
        path="/settings"
        element={
          // <MainLayout>
            <SettingsIndex />
          // </MainLayout>
        }
      />

      <Route
        path="/customers-vendors"
        element={
          <MainLayout>
            <CustomersAndVendorsIndex />
          </MainLayout>
        }
      />
      <Route
        path="/customers-feild-settings"
        element={
          <MainLayout>
            <CustomFieldsSettings />
          </MainLayout>
        }
      />
      <Route
        path="/New-Custom-Field-Contacts"
        element={
          <MainLayout>
            <NewCustomFieldContacts />
          </MainLayout>
        }
      />
      <Route
        path="/New-Custom-LinkForm"
        element={
          <MainLayout>
            <CustomLinkForm />
          </MainLayout>
        }
      />
      {/*//---------------------------InvoicesLayout-------------??  */}
      <Route
        path="/invoicesLayout"
        element={
          <MainLayout>
            <InvoicesLayout />
          </MainLayout>
        }
      />
      <Route
        path="/InvoiceForm"
        element={
          <MainLayout>
            <InvoiceForm />
          </MainLayout>
        }
      />

      {/*//---------------------------Payemnt Received-------------??  */}

      <Route 
        path="/payemntReceived"
        element={
          <MainLayout>
            <PaymentReceivedLayout />
          </MainLayout>
        }
      />

      <Route 
        path="/PaymentRecevibleForm"
        element={
          <MainLayout>
            <PaymentRecevibleForm />
          </MainLayout>
        }
      />
      <Route 
        path="/PaymentReceipt/:id"
        element={
          <MainLayout>
            <PaymentReceipt />
          </MainLayout>
        }
      />
      <Route 
        path="/vendorLayout"
        element={
          <MainLayout>
            <VendorLayout />
          </MainLayout>
        }
      />
      <Route 
        path="/expensesLayout"
        element={
          <MainLayout>
            <ExpensesLayout />
          </MainLayout>
        }
      />
      <Route 
        path="/expenseForm"
        element={
          <MainLayout>
            <ExpenseForm />
          </MainLayout>
        }
      />
      <Route 
        path="/expenseDetailedPage/:id"
        element ={
          <MainLayout>
            <ExpenseDetailedPage />
          </MainLayout>
        }
      />

      {/*//---------------------------Purchase Received-------------??  */}

      <Route 
        path="/PurchaseReceivesLayout"
        element={
          <MainLayout>
            <PurchaseReceivesLayout />
          </MainLayout>
        }
      />
       <Route 
        path="/PurcahseReceivesForm"
        element={
          <MainLayout>
            <PurcahseReceivesForm />
          </MainLayout>
        }
      />
      <Route 
        path="/PurchaseReceiveDetailedPage/:id"
        element={
          <MainLayout>
            <PurchaseReceiveDetailedPage />
          </MainLayout>
        }
      />

      


      {/*//--------------------------- Manual Journals -------------??  */}

      <Route 
        path="/manualJournals"
        element ={
          <MainLayout>
            <ManualJournalsLayout />
          </MainLayout>
        }
      />
      <Route 
        path="/ManualJouralsDetailedPage/:id"
        element ={
          <MainLayout>
            <ManualJouralsDetailedPage />
          </MainLayout>
        }
      />
      <Route 
        path="/ManualJournalscreteForm"
        element ={
          <MainLayout>
            <ManualJournalscreteForm />
          </MainLayout>
        }
      />
      <Route 
        path="/ChartOfAccountsLayout"
        element ={
          <MainLayout>
            <ChartOfAccountsLayout />
          </MainLayout>
        }
      />
      <Route 
        path="/ChartOfAccountDetailedPage/:id"
        element ={
          <MainLayout>
            <ChartOfAccountDetailedPage />
          </MainLayout>
        }
      />
      
    </Routes>

      
    
  );
};

export default AppRoutes;
