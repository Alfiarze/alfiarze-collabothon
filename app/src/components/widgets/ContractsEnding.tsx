import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface ContractResponse {
  user_id: string;
  contract_id: string;
  contract_type: string;
  name: string;
  amount: number;
  start_date: string;
  end_date: string;
  status: string;
  file: string;
}

interface Contract {
  id: string;
  name: string;
  category: 'rental' | 'employment' | 'service' | 'other';
  end_date: string;
  amount: number;
  status: 'Active' | 'Pending' | 'Expired';
}

const ContractsEnding = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    // Three example contracts
    const exampleContracts: ContractResponse[] = [
      {
        user_id: "user1",
        contract_id: "contract1",
        contract_type: "Rental Agreement",
        name: "Apartment Lease",
        amount: 1200,
        start_date: "2023-06-01",
        end_date: "2024-10-21",
        status: "Active",
        file: "/contracts/rental_agreement.jpg"
    },
    {
        user_id: "user1",
        contract_id: "contract2",
        contract_type: "Employment Contract",
        name: "Software Developer Position",
        amount: 5000,
        start_date: "2023-01-15",
        end_date: "2025-01-14",
        status: "Active",
        file: "/contracts/employment_contract.jpg"
    },
    {
        user_id: "user1",
        contract_id: "contract3",
        contract_type: "Service Agreement",
        name: "Web Hosting Service",
        amount: 50,
        start_date: "2023-03-01",
        end_date: "2025-02-29",
        status: "Active",
        file: "/contracts/service_agreement.jpg"
    }
    ];
    const mappedContracts = mapContractsResponse(exampleContracts);
    setContracts(mappedContracts);
  }, []);

  const mapContractsResponse = (data: ContractResponse[]): Contract[] => {
    return data.map((contract) => ({
      id: contract.contract_id,
      name: contract.name,
      category: getCategoryFromType(contract.contract_type),
      end_date: contract.end_date,
      amount: contract.amount,
      status: contract.status as Contract['status']
    }));
  };

  const getCategoryFromType = (type: string): Contract['category'] => {
    if (type.toLowerCase().includes('rental')) return 'rental';
    if (type.toLowerCase().includes('employment')) return 'employment';
    if (type.toLowerCase().includes('service')) return 'service';
    return 'other';
  };

  const calculateDaysRemaining = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCategoryColor = (category: Contract['category']): string => {
    const colors = {
      rental: '#4caf50',
      employment: '#2196f3',
      service: '#ff9800',
      other: '#9e9e9e'
    };
    return colors[category] || '#9e9e9e';
  };

  const getStatusColor = (status: Contract['status']): string => {
    const colors = {
      Active: '#4caf50',
      Pending: '#ff9800',
      Expired: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Contracts and Bills Ending Soon
      </Typography>
      <List>
        {contracts.map((contract) => (
          <ListItem key={contract.id}>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" component="span" mr={1}>
                      {contract.name}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      {contract.amount.toFixed(2)}
                    </Typography>
                    <Chip
                      label={contract.category}
                      size="small"
                      sx={{ mr: 1, backgroundColor: getCategoryColor(contract.category), color: 'white' }}
                    />
                    <Chip
                      label={contract.status}
                      size="small"
                      sx={{ backgroundColor: getStatusColor(contract.status), color: 'white' }}
                    />
                  </Box>
                </Box>
              }
              secondary={`Expires in ${calculateDaysRemaining(contract.end_date)} days (${contract.end_date})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContractsEnding;
