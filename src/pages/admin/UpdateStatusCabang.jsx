const UpdateStatusCabang = () => {
    return(
        <>
           <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                    <table className="table table-striped table-bordered first">
                        <thead>
                        <tr>
                            <th>RL</th>
                            <th>REG 1</th>
                            <th>REG 2</th>
                            <th>ID</th>
                            <th>BU</th>
                            <th>DATE</th>
                            <th>TITLE</th>
                            <th>TYPE</th>
                            <th>ACTION</th>
                            <th>CANCEL</th>
                            <th>CLOSE</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>PST</td>
                            <td>RB-8078</td>
                            <td>RB-8083</td>
                            <td>GT/2025020066/PIV</td>
                            <td>50</td>
                            <td>2025-03-10 11:21:12</td>
                            <td>Permohonan Biaya Pembayaran Vendor PT.PLATINDO KARYA PRIMA No. Invoice:IVS250200076</td>
                            <td>99.LAIN-LAIN</td>
                            <td>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
                                <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
                            </div>
                            </td>
                            <td>
                            <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
                            </td>
                        </tr>
                        <tr>
                            <td>PST</td>
                            <td>RB-8078</td>
                            <td>RB-8083</td>
                            <td>GT/2025020066/PIV</td>
                            <td>50</td>
                            <td>2025-03-10 11:21:12</td>
                            <td>Permohonan Biaya Pembayaran Vendor PT.PLATINDO KARYA PRIMA No. Invoice:IVS250200076</td>
                            <td>99.LAIN-LAIN</td>
                            <td>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-primary" type="submit"><i className="fas fa-edit" /></button>
                                <button className="btn btn-warning" type="submit"><i className="fas fa-map-marker-alt" /></button>
                            </div>
                            </td>
                            <td>
                            <button className="btn btn-danger" type="submit"><i className="fas fa-expand-arrows-alt" /></button>
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

export default UpdateStatusCabang;