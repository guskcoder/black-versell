"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { dashboardData, summaryData } from '@/data/dashboard-data';

interface DataItem {
  date: string;
  totalTransactions: number;
  totalAmount: number;
  profit: number;
  dayOfWeek: string;
}

export default function Dashboard() {
  const [data, setData] = useState<DataItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  const loadData = () => {
    // Simula um pequeno delay como se estivesse carregando
    setTimeout(() => {
      setData(dashboardData);
    }, 500);
  };

  const calculateTotals = () => {
    if (!data || !data.length) return { transacoes: 0, valor: 0, lucro: 0 };

    return data.reduce(
      (acc, item) => {
        return {
          transacoes: acc.transacoes + item.totalTransactions,
          valor: acc.valor + item.totalAmount,
          lucro: acc.lucro + item.profit
        };
      },
      { transacoes: 0, valor: 0, lucro: 0 }
    );
  };

  const totals = calculateTotals();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  const CustomLabel = (props: { x?: number; y?: number; value?: number; index?: number }) => {
    const { x = 0, y = 0, value = 0 } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={-20}
          y={-16}
          width={40}
          height={20}
          rx={4}
          ry={4}
          fill="#3B82F6"
        />
        <text
          x={0}
          y={-2}
          fill="white"
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  const CustomLabelCurrency = (props: { x?: number; y?: number; value?: number; index?: number }) => {
    const { x = 0, y = 0, value = 0 } = props;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2
    }).format(value);
    const width = formattedValue.length * 6 + 10;
    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={-width/2}
          y={-16}
          width={width}
          height={20}
          rx={4}
          ry={4}
          fill="#10B981"
        />
        <text
          x={0}
          y={-2}
          fill="white"
          textAnchor="middle"
          fontSize={11}
          fontWeight="bold"
        >
          {formattedValue}
        </text>
      </g>
    );
  };

  const chartData = data && data.length > 0 ? data.slice().reverse().map(item => ({
    data: item.dayOfWeek,
    transacoes: item.totalTransactions,
    valor: item.totalAmount,
    lucro: item.profit
  })) : []

  if (!mounted || data.length === 0) {
    return (
      <div className="min-h-screen bg-[#101828] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101828] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Image
            src="https://app.versellbank.com/assets/versell-logo.svg"
            alt="Versell Logo"
            width={150}
            height={40}
          />
          <button
            onClick={() => {
              setIsRefreshing(true);
              setTimeout(() => {
                loadData();
                setIsRefreshing(false);
              }, 1000);
            }}
            disabled={isRefreshing}
            className={`bg-[#354153] hover:bg-[#4A5568] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Total de Transações</p>
            <p className="text-3xl font-bold text-white">
              {formatNumber(totals.transacoes)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Valor Total Transacionado</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(totals.valor)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Lucro Total</p>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(totals.lucro)}
            </p>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <p className="text-gray-400 text-sm mb-2">Período</p>
            <p className="text-2xl font-bold text-blue-400">
              7 Dias
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <h2 className="text-xl font-bold text-white mb-4">Evolução das Transações</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTransacoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#354153" />
                <XAxis dataKey="data" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1D2A39', border: '1px solid #354153' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="transacoes"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorTransacoes)"
                  name="Transações"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  label={<CustomLabel />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153]">
            <h2 className="text-xl font-bold text-white mb-4">Evolução do Lucro</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#354153" />
                <XAxis dataKey="data" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1D2A39', border: '1px solid #354153' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="lucro"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorLucro)"
                  name="Lucro (R$)"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', r: 4 }}
                  label={<CustomLabelCurrency />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1D2A39] rounded-lg p-6 border border-[#354153] overflow-x-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            Histórico de Transações por Dia
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#354153]">
                <th className="text-left text-gray-400 py-3 px-4">Data</th>
                <th className="text-left text-gray-400 py-3 px-4">Dia</th>
                <th className="text-right text-gray-400 py-3 px-4">
                  Transações
                </th>
                <th className="text-right text-gray-400 py-3 px-4">
                  Valor Total
                </th>
                <th className="text-right text-gray-400 py-3 px-4">Lucro</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#354153] hover:bg-[#354153] transition-colors"
                >
                  <td className="text-white py-3 px-4">
                    {item.date}
                  </td>
                  <td className="text-white py-3 px-4">
                    {item.dayOfWeek}
                  </td>
                  <td className="text-white text-right py-3 px-4">
                    {formatNumber(item.totalTransactions)}
                  </td>
                  <td className="text-white text-right py-3 px-4">
                    {formatCurrency(item.totalAmount)}
                  </td>
                  <td className="text-green-400 text-right py-3 px-4">
                    {formatCurrency(item.profit)}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="text-gray-400 text-center py-8">
                    Nenhum dado disponível
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
