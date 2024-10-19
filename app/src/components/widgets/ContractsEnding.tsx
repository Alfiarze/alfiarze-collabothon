import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface ContractResponse {
  contract_id: string;
  contract_type: string;
  end_date: string;
  amount: number;
  status: 'active' | 'pending' | 'expired';
}

interface Contract {
  id: string;
  name: string;
  category: 'energy' | 'housing' | 'other';
  end_date: string;
  amount: number;
  status: 'active' | 'pending' | 'expired';
}

const ContractsEnding = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await axiosPrivate.get<ContractResponse[]>('api/contracts/');
      const allContracts = mapContractsResponse(response.data);
      const contractsEndingSoon = filterContractsEndingSoon(allContracts);
      setContracts(contractsEndingSoon);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  const mapContractsResponse = (data: ContractResponse[]): Contract[] => {
    return data.map((contract) => ({
      id: contract.contract_id,
      name: contract.contract_type,
      category: contract.contract_type.toLowerCase() as Contract['category'],
      end_date: contract.end_date,
      amount: contract.amount,
      status: contract.status
    }));
  };

  const filterContractsEndingSoon = (contracts: Contract[]): Contract[] => {
    return contracts.filter((contract: Contract) => {
      const daysRemaining = calculateDaysRemaining(contract.end_date);
      return daysRemaining <= 2 && daysRemaining >= 0;
    });
  };

  const calculateDaysRemaining = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCategoryColor = (category: Contract['category']): string => {
    const colors = {
      energy: '#4caf50',
      housing: '#2196f3',
      other: '#ff9800'
    };
    return colors[category] || '#9e9e9e';
  };

  const getStatusColor = (status: Contract['status']): string => {
    const colors = {
      active: '#4caf50',
      pending: '#ff9800',
      expired: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  };

  return (
    <Box sx={{ p: 3 }}>
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
