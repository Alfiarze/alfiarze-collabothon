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
  { header: 'Contract ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Start Date', accessor: 'startDate' },
  { header: 'End Date', accessor: 'endDate' },
  { header: 'Value', accessor: 'value' },
  { header: 'Status', accessor: 'status' },
];

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
          {data.map((contract, rowIndex) => (
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
