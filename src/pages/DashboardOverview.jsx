import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, ClipboardList } from 'lucide-react';
import { SummaryCardSkeleton } from '../components/SkeletonLoader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Dummy statistics
  const stats = {
    totalReports: 45,
    pending: 12,
    inProgress: 18,
    completed: 15,
    totalTechnicians: 8,
    activeToday: 5
  };

  // Dummy data for charts - Realistic monthly report data
  const monthlyData = [
    { month: 'Jan', reports: 45 },
    { month: 'Feb', reports: 52 },
    { month: 'Mar', reports: 48 },
    { month: 'Apr', reports: 61 },
    { month: 'May', reports: 55 },
    { month: 'Jun', reports: 58 },
    { month: 'Jul', reports: 43 },
    { month: 'Aug', reports: 67 },
    { month: 'Sep', reports: 71 },
    { month: 'Oct', reports: 64 },
    { month: 'Nov', reports: 69 },
    { month: 'Dec', reports: 58 },
  ];

  // Chart.js configuration for monthly reports
  const chartData = {
    labels: monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Jumlah Laporan',
        data: monthlyData.map(item => item.reports),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `Bulan ${context[0].label}`,
          label: (context) => `Total: ${context.raw} laporan`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 20,
        },
      },
    },
  };

  const reportsByStatus = [
    { status: 'Pending', count: 12, color: 'bg-red-500' },
    { status: 'In Progress', count: 18, color: 'bg-yellow-500' },
    { status: 'Completed', count: 15, color: 'bg-green-500' },
  ];

  // Chart Skeleton Component
  const ChartSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="flex items-end justify-between h-64 gap-2">
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gray-200 rounded-t animate-pulse"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            ></div>
            <div className="w-6 h-3 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Activity Skeleton Component
  const ActivitySkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-3">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 pb-3 border-b last:border-0">
            <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Laporan</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
                </div>
                <ClipboardList className="text-blue-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
                </div>
                <TrendingUp className="text-red-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.inProgress}</p>
                </div>
                <BarChart3 className="text-yellow-500" size={40} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
                </div>
                <Users className="text-green-500" size={40} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            {/* Bar Chart - Monthly Reports using Chart.js */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Laporan per Bulan</h2>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Pie Chart - Reports by Status using Chart.js */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Status Laporan</h2>
              
              {/* Legend */}
              <div className="flex flex-col gap-3 mb-6">
                {reportsByStatus.map((item, idx) => {
                  const percentage = ((item.count / stats.totalReports) * 100).toFixed(1);
                  const colors = ['#ef4444', '#eab308', '#22c55e'];
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: colors[idx] }}
                      ></div>
                      <span className="text-sm font-medium flex-1">{item.status}</span>
                      <span className="text-sm font-semibold">{item.count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>

              {/* Doughnut Chart */}
              <div className="flex justify-center">
                <div className="relative w-56 h-56">
                  <Doughnut 
                    data={{
                      labels: reportsByStatus.map(item => item.status),
                      datasets: [{
                        data: reportsByStatus.map(item => item.count),
                        backgroundColor: ['#ef4444', '#eab308', '#22c55e'],
                        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
                        borderWidth: 3,
                        hoverOffset: 8,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '65%',
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: 'rgba(17, 24, 39, 0.9)',
                          titleFont: { size: 14, weight: 'bold' },
                          bodyFont: { size: 13 },
                          padding: 12,
                          cornerRadius: 8,
                          callbacks: {
                            label: (context) => {
                              const percentage = ((context.raw / stats.totalReports) * 100).toFixed(1);
                              return `${context.raw} laporan (${percentage}%)`;
                            },
                          },
                        },
                      },
                    }}
                  />
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-800">{stats.totalReports}</p>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity */}
      {loading ? (
        <div className="mt-6">
          <ActivitySkeleton />
        </div>
      ) : (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Terkini</h2>
          <div className="space-y-3">
            {[
              { time: '10 menit lalu', action: 'Laporan baru: AC Rusak di Ruang 301', type: 'new' },
              { time: '1 jam lalu', action: 'Teknisi Ahmad menyelesaikan perbaikan di Lab A', type: 'complete' },
              { time: '2 jam lalu', action: 'Laporan ditugaskan ke Teknisi Budi', type: 'assign' },
              { time: '3 jam lalu', action: 'Laporan baru: Proyektor tidak menyala di Aula', type: 'new' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-3 border-b last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'new' ? 'bg-blue-500' : 
                  activity.type === 'complete' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
