import Sidebar from "./components/Sidebar";
import { useState } from "react";
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import NewCombination from "./components/Bullion_dashboard/NewCombination";
import LinkBBP from "./components/Bullion_dashboard/LinkBBP";
import UseFormAddSupplier from "./components/Bullion_dashboard/AddSupplier";
import AddNewItem from "./components/Bullion_dashboard/AddNewItem";
import Inquiry from "./components/Bullion_dashboard/Inquiry";
import OrderToSupplier from "./components/Bullion_dashboard/OrderToSupplier";
import PurchaseNewOrder from "./components/Bullion_dashboard/PurchaseNewOrder";
import BullionInvoice from "./components/Bullion_dashboard/BullionInvoice"
import BullionReciept from "./components/Bullion_dashboard/BullionReciept";
import Dashboard from "./components/Bullion_dashboard/Dashboard";
import Dashboard_jewellery from "./components/Jewellery_dashboard/Dashboard_jewellery";
import ClientData from "./components/Jewellery_dashboard/ClientData"
import PDF_Creation from "./components/Jewellery_dashboard/PDF_Creation";
import { dataContext } from "./components/helpers/context";
import Plain_J_Invoice from "./components/Jewellery_dashboard/Plain_J_Invoice";
import Sale_Reciept from "./components/Jewellery_dashboard/Sale_Reciept";
const drawerWidth = 280;

  function App() {
    const [globleData,setGlobleData] = useState()
  const Section = styled.section`
  margin-top:64px;
  position:relative;
  height:calc(100vh - 64px);
  padding-left:${drawerWidth}px;
  @media (max-width: 600px) {
    padding - left:0;
    }
  `

  return (

  <>
    {/* <Sidebar /> */}
    <dataContext.Provider value={{globleData,setGlobleData}}>
    <Section >
    <Router>
      <Routes>
        <Route path="/NewCombination" element={<NewCombination />} />
        <Route path="/listbbp" element={<LinkBBP />} />
        <Route path="/userformaddsupplier" element={<UseFormAddSupplier />} />
        <Route path="/addnewitem" element={<AddNewItem />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/ordertosupplier" element={<OrderToSupplier />} />
        <Route path="/purchaseordernew" element={<PurchaseNewOrder />} />
        <Route path="/BullionInvoice" element={<BullionInvoice />} />
        <Route path="/BullionReciept" element={<BullionReciept />} />
        <Route path="/home" element={<Dashboard />} />
        
        
        {/* jewellery dashboard navigatoin */}
        <Route path="/" element={<Dashboard_jewellery />} />
        <Route path="/ClientData" element={<ClientData />} />
        <Route path="/PDF_Creation" element={<PDF_Creation />} />
        <Route path="/Plain_J_Invoice" element={<Plain_J_Invoice />} />
        <Route path="/Sale_Reciept" element={<Sale_Reciept />} />

      </Routes>
    </Router>
  </Section>
  </dataContext.Provider>
</>
  );
}

export default App;
