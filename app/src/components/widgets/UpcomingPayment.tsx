import React from 'react';

interface Payment {
  id: string;
  amount: number;
  dueDate: Date;
  description: string;
}

interface UpcomingPaymentProps {
  payments: Payment[];
}

const UpcomingPayment: React.FC<UpcomingPaymentProps> = ({ payments }) => {
  return (
    <div className="upcoming-payments">
      <h2>Upcoming Payments</h2>
      {payments.map((payment) => (
        <div key={payment.id} className="payment-item">
          <p>{payment.description}</p>
          <p>Amount: ${payment.amount.toFixed(2)}</p>
          <p>Due Date: {payment.dueDate.toLocaleDateString()}</p>
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
