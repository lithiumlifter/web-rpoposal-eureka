import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./layouts/AdminPanel";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/fonts/circular-std/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/admin/Home"; 
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
import Modal from 'react-modal';
import { ToastProvider } from "./utils/toast";
import DetailProposalPusat from "./pages/admin/DetailProposalPusat";
import OtorisasiPusatDirektur from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatDirektur";
import DetailOtorisasiPusatDirektur from "./pages/admin/OtorisasiPusatDirektur/DetailOtorisasiPusatDirektur";
import OtorisasiPusatDirekturEurekaLogistics from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatEurekaLogistics";
import OtorisasiPusatDirekturRajaCepat from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatRajaCepat";
import OtorisasiPusatDirekturEurekaBookhouse from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatEurekaBookhouse";
import OtorisasiPusatDirekturMasterDiskon from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatMasterDiskon";
import OtorisasiPusatDirekturKataRasa from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatKataRasa";
import OtorisasiPusatDirekturJajaUsahaLaku from "./pages/admin/OtorisasiPusatDirektur/OtorisasiPusatJajaUsahaLaku";
import PrivacyPolicy from "./pages/admin/PrivacyPolicy";
import DeleteAccount from "./pages/admin/DeleteAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactSupport from "./pages/admin/OtorisasiPusatDirektur/ContactSupport";

Modal.setAppElement('#root');

function App() {
  return (
   <>
      <ToastProvider />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/printview" element={<PrintView />} />
          <Route path="/print-report-cabang" element={<PrintReportCabang />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="contact-support" element={<ContactSupport />} />

          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}>
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
            <Route path="updatestatuspusat" element={<UpdateStatusPst />} />
            <Route path="otorisasi-pusat" element={<OtorisasiPusat />} />
            <Route path="otorisasipusat-direktur-all" element={<OtorisasiPusatDirektur />} />
            <Route path="otorisasibandingpst" element={<OtorisasiBandingPusat />} />
            <Route path="proposalreport" element={<ProposalReport />} />
            <Route path="reporttocabang" element={<ReportToCabang />} />
            <Route path="otorisationnotcompleted" element={<OtorisationNotCompleted />} />
            <Route path="otorisationpending" element={<OtorisasiPending />} />
            <Route path="reportkpi" element={<ReportKpi />} />
            <Route path="inboxcabang/:id_proposal" element={<DetailProposalCabang />} />
            <Route path="inboxpusat/:id_proposal" element={<DetailProposalPusat />} />
            <Route path="updatestatuscabang/:id_proposal" element={<DetailProposalCabang />} />
            <Route path="updatestatuspusat/:id_proposal" element={<DetailProposalCabang />} />
            <Route path="updateanggaran/:id_proposal" element={<InputAnggaran />} />
            <Route path="proposalreport/:id_proposal" element={<DetailProposalReport />} />
            <Route path="detailotorisasi/:id_otorisasi" element={<DetailLevelOtorisasi />} />
            <Route path="detailregistrasiuser/:id_user" element={<DetailRegistrasiUser />} />
            <Route path="detailotorisasipusat/:id_proposal" element={<DetailOtorisasiPusat />} />
            <Route path="detailotorisasipusat-direktur/:id_proposal" element={<DetailOtorisasiPusatDirektur />} />
            <Route path="otorisasipusat-direktur/eurekalogistics" element={<OtorisasiPusatDirekturEurekaLogistics />} />
            <Route path="otorisasipusat-direktur/rajacepat" element={<OtorisasiPusatDirekturRajaCepat />} />
            <Route path="otorisasipusat-direktur/eurekabookhouse" element={<OtorisasiPusatDirekturEurekaBookhouse />} />
            <Route path="otorisasipusat-direktur/masterdiskon" element={<OtorisasiPusatDirekturMasterDiskon />} />
            <Route path="otorisasipusat-direktur/katarasa" element={<OtorisasiPusatDirekturKataRasa />} />
            <Route path="otorisasipusat-direktur/jajausahalaku" element={<OtorisasiPusatDirekturJajaUsahaLaku />} />

            <Route path="printview" element={<PrintView />} />
            <Route path="registrasiuser" element={<RegistrasiUser />} />
            <Route path="setupuser" element={<SetupUser />} />
            <Route path="ubahpassword" element={<UbahPassword />} />
            <Route path="deleteaccount" element={<DeleteAccount />} />
          </Route>
        </Routes>
      </Router>
   </>
  );
}

export default App;
