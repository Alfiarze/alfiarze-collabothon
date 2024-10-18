import React from 'react';
import Table from '../components/Table';

const MatiTest = () => {
  // Sample contract data
  const contractData = [
    { id: 'C001', name: 'Project Alpha', startDate: '2024-01-01', endDate: '2024-12-31', value: 100000, status: 'Active' },
    { id: 'C002', name: 'Project Beta', startDate: '2024-02-15', endDate: '2024-08-15', value: 75000, status: 'Pending' },
    { id: 'C003', name: 'Project Gamma', startDate: '2024-03-01', endDate: '2025-02-28', value: 150000, status: 'Active' },
  ];

  console.log('MatiTest rendering, contractData:', contractData);

  return (
    <div style={{padding: '20px'}}>
    <h2 style={{marginBottom: '20px'}}>Bank Comparison Table</h2>
    <Table  data={contractData} />
  </div>
  );
};

export default MatiTest;
