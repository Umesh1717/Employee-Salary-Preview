import { useState } from 'react';
import './App.css';
import Papa from "papaparse";

const App = () => {
  const [data, setData] = useState([])
  const [totalNetSalary, settotalNetSalary] = useState()
  const handleFileUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data.map((row) => ({
          employeeId: row["Employee ID"] || "",
          name: row["Name"] || "",
          netSalary: row["Net Salary"] || "",
          lopDays: row["LOP Days"] || "",
          pf: row["PF"] || "",
          esi: row["ESI"] || "",
          tds: row["TDS"] || ""
        }));
        setData(parsedData);
        let sum=0;
        result.data.map(row=>(
          sum+=parseInt(row["Net Salary"])
        ))
       settotalNetSalary(sum)
      }
    })
  }
  return (
    <div className="App">
      <h2>Employee Salary Preview</h2>
      <div>
        <input type="file" name="" id="" onChange={handleFileUpload} />
      </div>
      {data.length > 0 &&
      <>
       <table className='employee-table'>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Net Salary</th>
          <th>LOP Days</th>
          <th>PF</th>
          <th>ESI</th>
          <th>TDS flags</th>
        </tr>
        { data.map((row,i) => (
          <tr key={i}>
            <td>{row.employeeId}</td><td>{row.name}</td>
            <td>{row.netSalary}</td>
            <td>{row.lopDays}</td>
            <td>{row.pf}</td>
            <td>{row.esi}</td>
            <td>{row.tds}</td>
          </tr>
        )
        )}
      </table>
      <h4>Total Net Salary: <b>{totalNetSalary.toLocaleString("en-IN")}</b></h4>
      <button className='proceed'>Proceed to Disbursal</button>
      </>
      }
     
    </div>
  );
}

export default App;
