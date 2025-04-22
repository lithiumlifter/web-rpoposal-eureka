const OtorisasiCabang = () => {
    return(
        <>
           <div className="card">
            <div className="card-body">
                <div className="table-responsive">
                <table className="table table-striped table-bordered first">
                    <thead>
                    <tr>
                        <th>OTO</th>
                        <th>REG</th>
                        <th>ID</th>
                        <th>BU</th>
                        <th>DATE</th>
                        <th>TITLE</th>
                        <th>TYPE</th>
                        <th>STATUS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <tr>
                        <td>PST</td>
                        <td>RB-8078</td>
                        <td>RB-8083</td>
                        <td>GT/2025020066/PIV</td>
                        <td>50</td>
                        <td>2025-03-10 11:21:12</td>
                        <td>Permohonan Biaya Pembayaran Vendor PT.PLATINDO KARYA PRIMA No. Invoice:IVS250200076</td>
                        <td>99.LAIN-LAIN</td>
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
                    </tr> */}
                    <tr>
                                     <td colSpan="10" className="text-center">TIDAK ADA DATA</td>
                                </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </>
    );
}

export default OtorisasiCabang;