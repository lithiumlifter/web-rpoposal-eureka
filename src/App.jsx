import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./layouts/AdminPanel";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/fonts/circular-std/style.css";
// import "./assets/libs/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/admin/home"; 
import AxDimension from "./pages/admin/axdimension";
import AxCustomer from "./pages/admin/axcustomer";
import UpdateAnggaran from "./pages/admin/UpdateAnggaran";
import UpdateStatusCabang from "./pages/admin/UpdateStatusCabang";
import OtorisasiCabang from "./pages/admin/OtorisasiCabang";
import LevelOtorisasi from "./pages/admin/LevelOtorisasi";
import RegistrasiUser from "./pages/admin/RegistrasiUser";
import SetupUser from "./pages/admin/SetupUser";
import UbahPassword from "./pages/admin/UbahPassword";
import InputProposal from "./pages/admin/InputProposal";
import InboxCabang from "./pages/admin/InboxCabang";
import ValidasiOtorisasi from "./pages/admin/ValidasiOtorisasi";
import RubahRuangLingkup from "./pages/admin/RubahRuangLingkup";
import InboxPusat from "./pages/admin/InboxPusat";
import UpdateStatusPst from "./pages/admin/UpdateStatusPst";
import OtorisasiPusat from "./pages/admin/OtorisasiPusat";
import OtorisasiBandingPusat from "./pages/admin/OtorisasiBandingPusat";
import ProposalReport from "./pages/admin/ProposalReport";
import OtorisationNotCompleted from "./pages/admin/OtorisationNotCompleted";
import OtorisasiPending from "./pages/admin/OtorisasiPending";
import ReportKpi from "./pages/admin/ReportKpi";
import DetailProposalCabang from "./pages/admin/DetailProposalCabang";
import InputAnggaran from "./pages/admin/InputAnggaran";
import DetailProposalReport from "./pages/admin/DetailProposalReport";
import DetailLevelOtorisasi from "./pages/admin/DetailLevelOtorisasi";
import DetailRegistrasiUser from "./pages/admin/detailRegistrasiUser";
import DetailOtorisasiPusat from "./pages/admin/DetailOtorisasiPusat";
import PrintView from "./pages/print/PrintView";
import ReportToCabang from "./pages/admin/ReportToCabang";
import PrintReportCabang from "./pages/print/PrintReportToCabangView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Route printview dipindah keluar dari AdminPanel */}
        <Route path="/printview" element={<PrintView />} />
        <Route path="/print-report-cabang" element={<PrintReportCabang />} />

        {/* AdminPanel sebagai layout */}
        <Route path="/admin" element={<AdminPanel />}>
          {/* Menampilkan Home sebagai halaman default */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="axdimension" element={<AxDimension />} />
          <Route path="axcustomer" element={<AxCustomer />} />
          <Route path="inputproposal" element={<InputProposal />} />
          <Route path="updateanggaran" element={<UpdateAnggaran />} />
          <Route path="inboxcabang" element={<InboxCabang />} />
          <Route path="updatestatuscabang" element={<UpdateStatusCabang />} />
          <Route path="otorisasicabang" element={<OtorisasiCabang />} />
          <Route path="levelotorisasi" element={<LevelOtorisasi />} />
          <Route path="validasiotorisasi" element={<ValidasiOtorisasi />} />
          <Route path="rubahruanglingkup" element={<RubahRuangLingkup />} />
          <Route path="inboxpusat" element={<InboxPusat />} />
          <Route path="updatestatuspst" element={<UpdateStatusPst />} />
          <Route path="otorisasipusat" element={<OtorisasiPusat />} />
          <Route path="otorisasibandingpst" element={<OtorisasiBandingPusat />} />
          <Route path="proposalreport" element={<ProposalReport />} />
          <Route path="reporttocabang" element={<ReportToCabang />} />
          <Route path="otorisationnotcompleted" element={<OtorisationNotCompleted />} />
          <Route path="otorisationpending" element={<OtorisasiPending />} />
          <Route path="reportkpi" element={<ReportKpi />} />
          {/* <Route path="inboxcabang/:id" element={<DetailProposalCabang />} /> */}
          <Route path="inboxcabang/:id_proposal" element={<DetailProposalCabang />} />
          <Route path="updatestatuscabang/:id_proposal" element={<DetailProposalCabang />} />
          <Route path="updatestatuspusat/:id_proposal" element={<DetailProposalCabang />} />
          <Route path="updateanggaran/:id_proposal" element={<InputAnggaran />} />
          <Route path="proposalreport/:id_proposal" element={<DetailProposalReport />} />
          <Route path="detailotorisasi/:id_otorisasi" element={<DetailLevelOtorisasi />} />
          <Route path="detailregistrasiuser/:id_user" element={<DetailRegistrasiUser />} />
          <Route path="detailotorisasipusat/:id_proposal" element={<DetailOtorisasiPusat />} />
          <Route path="printview" element={<PrintView />} />

          <Route path="registrasiuser" element={<RegistrasiUser />} />
          <Route path="setupuser" element={<SetupUser />} />
          <Route path="ubahpassword" element={<UbahPassword />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
