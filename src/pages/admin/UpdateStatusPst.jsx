const UpdateStatusPst = () => {
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
                                <th>CAB</th>
                                <th>PST</th>
                                <th>ID</th>
                                <th>BU</th>
                                <th>DATE</th>
                                <th>TITLE</th>
                                <th>TYPE</th>
                                <th>OTO</th>
                                <th>PROSESS</th>
                                <th>CANCEL</th>
                                <th>CLOSE</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>PST</td>
                                    <td>RB-8078</td>
                                    <td>R-8078</td>
                                    <td>GT/2025020066/PIV</td>
                                    <td>50</td>
                                    <td>2025-03-11</td>
                                    <td>Permohonan Biaya Pembayaran Vendor PT. PLATINDO KARYA PRIMA No. Invoice: IVS250200078</td>
                                    <td>99. LAIN-LAIN</td>
                                    <td></td>
                                    <td>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
                                            <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
                                        </div>
                                    </td>
                                    <td>
                                    <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
                                    </td>
                                    <td>
                                    <button className="btn btn-success" type="submit">Close</button>
                                    </td>
                                    <td>
                                    <button className="btn btn-primary" type="submit"><i className=" fas fa-arrow-right" /></button>
                                    </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>

        </>
    );
}

export default UpdateStatusPst;