const RegistrasiUser = () => {
    return(
        <>
             <div className="card">
            <div className="card-body">
                <div className="table-responsive">
                <table className="table table-striped table-bordered first">
                    <thead>
                    <tr>
                        <th>NO</th>
                        <th />
                        <th>EMPLNAME</th>
                        <th>DIMENSION</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>JABATAN</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><button className="btn" type="submit"><i className="fas fa-sign-out-alt" /></button></td>
                        <td>B0011</td>
                        <td>Fatukhurohman</td>
                        <td>50</td>
                        <td>fatkhurohman.01@erlangga.co.id</td>
                        <td>082227617094</td>
                        <td>AMD HUB.KELEMBAGAAN HUKUM</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><button className="btn" type="submit"><i className="fas fa-sign-out-alt" /></button></td>
                        <td>B0011</td>
                        <td>Fatukhurohman</td>
                        <td>50</td>
                        <td>fatkhurohman.01@erlangga.co.id</td>
                        <td>082227617094</td>
                        <td>AMD HUB.KELEMBAGAAN HUKUM</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </>
    );
}

export default RegistrasiUser;