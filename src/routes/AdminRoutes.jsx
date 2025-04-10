import React from "react";
import { Route } from "react-router-dom";
import AdminPanel from "../layouts/AdminPanel";
import Home from "../pages/admin/home";
import AxDimension from "../pages/admin/axdimension";
import AxCustomer from "../pages/admin/axcustomer";
import UpdateAnggaran from "../pages/admin/UpdateAnggaran";
import UpdateStatusCabang from "../pages/admin/UpdateStatusCabang";
import OtorisasiCabang from "../pages/admin/OtorisasiCabang";
import LevelOtorisasi from "../pages/admin/LevelOtorisasi";
import RegistrasiUser from "../pages/admin/RegistrasiUser";
import SetupUser from "../pages/admin/SetupUser";
import UbahPassword from "../pages/admin/UbahPassword";
import InputProposal from "../pages/admin/InputProposal";
import InboxCabang from "../pages/admin/InboxCabang";
import ValidasiOtorisasi from "../pages/admin/ValidasiOtorisasi";
import RubahRuangLingkup from "../pages/admin/RubahRuangLingkup";
import InboxPusat from "../pages/admin/InboxPusat";
import UpdateStatusPst from "../pages/admin/UpdateStatusPst";
import OtorisasiPusat from "../pages/admin/OtorisasiPusat";
import OtorisasiBandingPusat from "../pages/admin/OtorisasiBandingPusat";
import ProposalReport from "../pages/admin/ProposalReport";
import ReportBanding from "../pages/admin/ReportBanding";
import OtorisationNotCompleted from "../pages/admin/OtorisationNotCompleted";
import OtorisasiPending from "../pages/admin/OtorisasiPending";
import ReportKpi from "../pages/admin/ReportKpi";
import DetailProposalCabang from "../pages/admin/DetailProposalCabang";
import InputAnggaran from "../pages/admin/InputAnggaran";
import DetailProposalReport from "../pages/admin/DetailProposalReport";
import DetailLevelOtorisasi from "../pages/admin/DetailLevelOtorisasi";
import DetailRegistrasiUser from "../pages/admin/detailRegistrasiUser";
import DetailOtorisasiPusat from "../pages/admin/DetailOtorisasiPusat";

const AdminRoutes = () => (
  <Route path="/admin" element={<AdminPanel />}>
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
    <Route path="reportbanding" element={<ReportBanding />} />
    <Route path="otorisationnotcompleted" element={<OtorisationNotCompleted />} />
    <Route path="otorisationpending" element={<OtorisasiPending />} />
    <Route path="reportkpi" element={<ReportKpi />} />
    <Route path="inboxcabang/:id_proposal" element={<DetailProposalCabang />} />
    <Route path="updatestatuscabang/:id_proposal" element={<DetailProposalCabang />} />
    <Route path="updatestatuspusat/:id_proposal" element={<DetailProposalCabang />} />
    <Route path="updateanggaran/:id_proposal" element={<InputAnggaran />} />
    <Route path="proposalreport/:id_proposal" element={<DetailProposalReport />} />
    <Route path="detailotorisasi/:id_otorisasi" element={<DetailLevelOtorisasi />} />
    <Route path="detailregistrasiuser/:id_user" element={<DetailRegistrasiUser />} />
    <Route path="detailotorisasipusat/:id_proposal" element={<DetailOtorisasiPusat />} />
    <Route path="registrasiuser" element={<RegistrasiUser />} />
    <Route path="setupuser" element={<SetupUser />} />
    <Route path="ubahpassword" element={<UbahPassword />} />
  </Route>
);

export default AdminRoutes;
