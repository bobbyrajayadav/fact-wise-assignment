import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-quartz.css";

import { employees } from './employeeData'; 
import Search from './components/Search';
import Header from './components/Header';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [rowData, setRowData] = useState(employees);
  const [searchText, setSearchText] = useState('');

  // COLUMNS DEFINITION
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", maxWidth: 70, headerName: "ID", cellClass: "text-center text-gray-600" },
    { field: "firstName", headerName: "First Name" }, 
    { field: "lastName", headerName: "Last Name" },
    { field: "email", minWidth: 250, headerName: "Email Address" }, 
    { field: "department", headerName: "Department" },
    { field: "position",minWidth: 180, headerName: "Role" },
    { //
      field: "salary", 
      headerClass: "ag-right-header", // Header right align
      cellClass: "text-right font-medium text-gray-700", // Text right align
      valueFormatter: (params) => "$" + params.value.toLocaleString(),
    },
    { field: "hireDate", headerName: "Joined" },
    //  Status Formatting (Color) ---
    { 
      field: "isActive", 
      headerName: "Status",
      cellClass: "flex justify-center items-center", // Center content
      cellRenderer: (params) => {
        const status = params.value ? "Active" : "Inactive";
        // Green for active, Red for inactive
        const badgeClass = params.value 
          ? "bg-green-100 text-green-700 border-green-200" 
          : "bg-red-100 text-red-700 border-red-200";

        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}>
            {status}
          </span>
        );
      }
    }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
      resizable: true,
      minWidth: 100,
    };
  }, []);

  

  return (
    <div  className="min-h-screen bg-gray-100 p-8 font-sans"> 

      <div className="flex flex-col md:flex-row justify-between items-center bg-pink-50 p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
        <Header/>
        <Search searchText={searchText} setSearchText={setSearchText} />
      </div>  

      <div className="
        ag-theme-quartz h-[515px] w-full shadow-xl rounded-xl overflow-hidden border border-gray-200
        [--ag-header-background-color:var(--color-gray-50)]
        [--ag-odd-row-background-color:var(--color-gray-50)]
        [--ag-row-hover-color:var(--color-blue-50)]
        ">
        <AgGridReact
          quickFilterText={searchText}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10} 
          paginationPageSizeSelector={[10, 20]} 
        />
      </div>

    </div>
  );
}

export default App;