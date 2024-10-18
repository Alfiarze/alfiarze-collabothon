import React from 'react';

export interface Column {
  header: string;
  accessor: string;
}

interface ContractData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  value: number;
  status: string;
}

interface TableProps {
  data: ContractData[];
}

const columns: Column[] = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Start Date', accessor: 'startDate' },
  { header: 'End Date', accessor: 'endDate' },
  { header: 'Value', accessor: 'value' },
  { header: 'Status', accessor: 'status' },
];

// Sample data
const sampleData: ContractData[] = [
  {
    id: '001',
    name: 'Contract A',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    value: 10000,
    status: 'Active'
  },
  // Add more sample data as needed
];

const Table: React.FC = () => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <table className="w-full text-sm text-left text-blue-700">
        <thead className="text-xs uppercase bg-blue-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((contract, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-yellow-50">
              <td className="px-6 py-4">{contract.id}</td>
              <td className="px-6 py-4">{contract.name}</td>
              <td className="px-6 py-4">{contract.startDate}</td>
              <td className="px-6 py-4">{contract.endDate}</td>
              <td className="px-6 py-4">${contract.value.toLocaleString()}</td>
              <td className="px-6 py-4">{contract.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
