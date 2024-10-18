import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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

const ContractTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align="left">
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((contract, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{contract.id}</TableCell>
              <TableCell>{contract.name}</TableCell>
              <TableCell>{contract.startDate}</TableCell>
              <TableCell>{contract.endDate}</TableCell>
              <TableCell>${contract.value.toLocaleString()}</TableCell>
              <TableCell>{contract.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContractTable;
