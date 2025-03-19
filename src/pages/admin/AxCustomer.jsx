import { useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";

const AxCustomer = () => {
    const [bu, setBu] = useState("");
    const [schoolName, setSchoolName] = useState("");
    
    const data = [
        { id: 1, accountNum: "ACH", name: "PT.PENERBIT ERLANGGA JAKARTA (HD)-51", schoolId: "50 - ERLANGGA JAKARTA", address: "JL. KASUWARI 1651, Perumahan Harapan Indah", zip: "13740", state: "DKI Jakarta", county: "JAKTIM", bu: "50" },
        { id: 2, accountNum: "C00000876", name: "PT.PENERBIT ERLANGGA SURABAYA (HD)-52", schoolId: "50 - ERLANGGA SURABAYA", address: "JL. BERBEK INDUSTRI 1651, Perumahan Harapan Indah", zip: "13740", state: "Surabaya", county: "SURABAYA", bu: "50" }
    ];
    
    const filteredData = data.filter(item =>
        (bu === "" || item.bu.includes(bu)) &&
        (schoolName === "" || item.name.toLowerCase().includes(schoolName.toLowerCase()))
    );
    
    return (
        <div className="card">
            <div className="card-body">
                <Row className="mb-3">
                    <Col md={2}>
                        <Form.Select value={bu} onChange={(e) => setBu(e.target.value)}>
                            <option value="">Semua BU</option>
                            <option value="50">BU 50</option>
                            <option value="51">BU 51</option>
                        </Form.Select>
                    </Col>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="Nama Sekolah"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" className="w-100">Tampilkan</Button>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>ACCOUNTNUM</th>
                                <th>NAME</th>
                                <th>SCHOOLID</th>
                                <th>ADDRESS</th>
                                <th>ZIPCODE</th>
                                <th>STATE</th>
                                <th>COUNTY</th>
                                <th>BU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.accountNum}</td>
                                    <td>{item.name}</td>
                                    <td>{item.schoolId}</td>
                                    <td>{item.address}</td>
                                    <td>{item.zip}</td>
                                    <td>{item.state}</td>
                                    <td>{item.county}</td>
                                    <td>{item.bu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AxCustomer;