import { useState } from "react";
import { Table, Form } from "react-bootstrap";

const AxDimension = () => {
    const [selectedBranch, setSelectedBranch] = useState("");
    
    const data = [
        { id: 1, num: "50", description: "Head Office", area: "erl" },
        { id: 2, num: "52", description: "CAB. JAKARTA", area: "erl" }
    ];
    
    const filteredData = data.filter(item =>
        selectedBranch === "" || item.num === selectedBranch
    );
    
    return (
        <div className="w-100 px-3">
            <div className="card">
                <div className="card-body">
                    <Form.Select className="mb-3" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                        <option value="">Semua Cabang</option>
                        {data.map((item) => (
                            <option key={item.id} value={item.num}>{item.description}</option>
                        ))}
                    </Form.Select>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered first w-100">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>NUM</th>
                                    <th>DESCRIPTION</th>
                                    <th>AREA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.num}</td>
                                        <td>{item.description}</td>
                                        <td>{item.area}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AxDimension;
