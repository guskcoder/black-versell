export const dashboardData = [
  {
    date: '2025-09-28',
    totalTransactions: 52487,
    totalAmount: 4721830.00,
    profit: 52487 * 0.50,
    dayOfWeek: 'Sábado'
  },
  {
    date: '2025-09-27',
    totalTransactions: 48932,
    totalAmount: 6241984.00,
    profit: 48932 * 0.50,
    dayOfWeek: 'Sexta'
  },
  {
    date: '2025-09-26',
    totalTransactions: 45678,
    totalAmount: 3424850.00,
    profit: 45678 * 0.50,
    dayOfWeek: 'Quinta'
  },
  {
    date: '2025-09-25',
    totalTransactions: 51234,
    totalAmount: 8196710.00,
    profit: 51234 * 0.50,
    dayOfWeek: 'Quarta'
  },
  {
    date: '2025-09-24',
    totalTransactions: 44567,
    totalAmount: 2906855.00,
    profit: 44567 * 0.50,
    dayOfWeek: 'Terça'
  },
  {
    date: '2025-09-23',
    totalTransactions: 49876,
    totalAmount: 5486360.00,
    profit: 49876 * 0.50,
    dayOfWeek: 'Segunda'
  },
  {
    date: '2025-09-22',
    totalTransactions: 41234,
    totalAmount: 4535740.00,
    profit: 41234 * 0.50,
    dayOfWeek: 'Domingo'
  }
];

export const summaryData = {
  totalTransactions: dashboardData.reduce((sum, day) => sum + day.totalTransactions, 0),
  totalAmount: dashboardData.reduce((sum, day) => sum + day.totalAmount, 0),
  totalProfit: dashboardData.reduce((sum, day) => sum + day.profit, 0),
  profitPerTransaction: 0.50,
  period: '22/09/2025 - 28/09/2025'
};

export const transactionDetails = [
  {
    id: 'TRX-001',
    date: '28/09/2025',
    time: '14:35:20',
    amount: 125.50,
    status: 'Aprovada',
    paymentMethod: 'Crédito'
  },
  {
    id: 'TRX-002',
    date: '28/09/2025',
    time: '13:20:15',
    amount: 89.90,
    status: 'Aprovada',
    paymentMethod: 'Débito'
  },
  {
    id: 'TRX-003',
    date: '28/09/2025',
    time: '12:15:45',
    amount: 167.30,
    status: 'Aprovada',
    paymentMethod: 'PIX'
  },
  {
    id: 'TRX-004',
    date: '28/09/2025',
    time: '11:45:30',
    amount: 55.00,
    status: 'Aprovada',
    paymentMethod: 'Crédito'
  },
  {
    id: 'TRX-005',
    date: '28/09/2025',
    time: '10:30:00',
    amount: 98.75,
    status: 'Aprovada',
    paymentMethod: 'Débito'
  },
  {
    id: 'TRX-006',
    date: '27/09/2025',
    time: '18:20:10',
    amount: 145.60,
    status: 'Aprovada',
    paymentMethod: 'Crédito'
  },
  {
    id: 'TRX-007',
    date: '27/09/2025',
    time: '17:15:25',
    amount: 78.90,
    status: 'Aprovada',
    paymentMethod: 'PIX'
  },
  {
    id: 'TRX-008',
    date: '27/09/2025',
    time: '16:40:50',
    amount: 132.45,
    status: 'Aprovada',
    paymentMethod: 'Crédito'
  },
  {
    id: 'TRX-009',
    date: '27/09/2025',
    time: '15:25:15',
    amount: 92.30,
    status: 'Aprovada',
    paymentMethod: 'Débito'
  },
  {
    id: 'TRX-010',
    date: '27/09/2025',
    time: '14:10:30',
    amount: 156.80,
    status: 'Aprovada',
    paymentMethod: 'Crédito'
  }
];