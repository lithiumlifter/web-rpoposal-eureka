const ProposalReport = () => {
    return (
         <>
              <div className="card">
                    {/* <h5 className="card-header">Update Anggaran</h5> */}
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-striped table-bordered first">
                            <thead>
                            <tr>
                                <th>RL</th>
                                <th>REG1/REG2</th>
                                <th>NO. PROPOSAL</th>
                                <th>TITLE</th>
                                <th>BU</th>
                                <th>VIEW</th>
                                <th>TGL RECIEVED CAB</th>
                                <th>MGRCAB</th>
                                <th>KADEPT</th>
                                <th>AKTCAB</th>
                                <th>KACAB</th>
                                <th>MGRPST</th>
                                <th>AKTPST</th>
                                <th>FIN</th>
                                <th>AMD</th>
                                <th>DIRMKT</th>
                                <th>DIRUTM</th>
                                <th>STATUS</th>
                                <th>USER</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>1</td>
                                    <td>RB-8087/R-8078</td>
                                    <td>GT/2025020066/PIV</td>
                                    <td>Permohonan Biaya Pembayaran Vendor PT. PLATINDO KARYA PRIMA No. Invoice: IVS25020066</td>
                                    <td>50</td>
                                    <td><button className="btn btn-success" type="submit"><i className="fas fa-search" /></button></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>ReceivedPusat</td>
                                    <td>P1140</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>

        </>
    );
}

export default ProposalReport;