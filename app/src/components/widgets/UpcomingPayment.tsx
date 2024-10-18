import React from 'react';

interface Payment {
  id: string;
  amount: number;
  dueDate: Date;
  description: string;
}

interface UpcomingPaymentProps {
  payments?: Payment[];
}

const UpcomingPayment: React.FC<UpcomingPaymentProps> = ({ payments }) => {
  const defaultPayments: Payment[] = [
    {
      id: '1',
      amount: 100.50,
      dueDate: new Date('2023-05-15'),
      description: 'Electricity Bill',
    },
    {
      id: '2',
      amount: 50.00,
      dueDate: new Date('2023-05-20'),
      description: 'Internet Subscription',
    },
    // Add more sample payments as needed
  ];

  const paymentData = payments || defaultPayments;

  return (
    <div className="upcoming-payments p-4 bg-white shadow-lg rounded-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h2 className="text-xl font-semibold mb-4">Upcoming Payments</h2>
      {paymentData.map((payment) => (
        <div key={payment.id} className="payment-item flex justify-between items-center p-5 border-b last:border-b-0">
          <div className="flex-1">
            <p className="text-lg font-medium">{payment.description}</p>
            <p className="text-sm text-gray-500">Due Date: {payment.dueDate.toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${payment.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingPayment;

// Example usage:
const samplePayments: Payment[] = [
  {
    id: '1',
    amount: 100.50,
    dueDate: new Date('2023-05-15'),
    description: 'Electricity Bill',
  },
  {
    id: '2',
    amount: 50.00,
    dueDate: new Date('2023-05-20'),
    description: 'Internet Subscription',
  },
  // Add more sample payments as needed
];

// Use the component like this:
// <UpcomingPayment payments={samplePayments} />
