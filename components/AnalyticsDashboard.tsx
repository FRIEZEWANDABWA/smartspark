import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  submissionsByDay: Array<{
    date: string;
    count: number;
    type: string;
  }>;
  totalStats: {
    total_contacts: number;
    total_quotes: number;
    contacts_this_week: number;
    quotes_this_week: number;
  };
  serviceStats: Array<{
    service: string;
    count: number;
  }>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  if (!data) {
    return <div className="text-red-400">Failed to load analytics</div>;
  }

  // Prepare chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const submissionsChartData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Contacts',
        data: last7Days.map(date => {
          const dayData = (data.submissionsByDay || []).filter(d => d.date === date && d.type === 'contact');
          return dayData.reduce((sum, d) => sum + d.count, 0);
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Quotes',
        data: last7Days.map(date => {
          const dayData = (data.submissionsByDay || []).filter(d => d.date === date && d.type === 'quote');
          return dayData.reduce((sum, d) => sum + d.count, 0);
        }),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const serviceChartData = {
    labels: (data.serviceStats || []).map(s => s.service),
    datasets: [
      {
        data: (data.serviceStats || []).map(s => s.count),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Contacts</h3>
          <p className="text-2xl font-bold text-white">{data.totalStats?.total_contacts || 0}</p>
          <p className="text-sm text-green-400">+{data.totalStats?.contacts_this_week || 0} this week</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Quotes</h3>
          <p className="text-2xl font-bold text-white">{data.totalStats?.total_quotes || 0}</p>
          <p className="text-sm text-green-400">+{data.totalStats?.quotes_this_week || 0} this week</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Leads</h3>
          <p className="text-2xl font-bold text-white">
            {(data.totalStats?.total_contacts || 0) + (data.totalStats?.total_quotes || 0)}
          </p>
          <p className="text-sm text-green-400">
            +{(data.totalStats?.contacts_this_week || 0) + (data.totalStats?.quotes_this_week || 0)} this week
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Conversion Rate</h3>
          <p className="text-2xl font-bold text-white">
            {(data.totalStats?.total_contacts || 0) > 0 
              ? Math.round(((data.totalStats?.total_quotes || 0) / (data.totalStats?.total_contacts || 1)) * 100)
              : 0}%
          </p>
          <p className="text-sm text-blue-400">Quote to Contact ratio</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions Over Time */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Submissions (Last 7 Days)</h3>
          <Line 
            data={submissionsChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: 'white' }
                }
              },
              scales: {
                x: { 
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: { 
                  ticks: { color: 'white' },
                  grid: { color: 'rgba(255,255,255,0.1)' }
                }
              }
            }}
          />
        </div>

        {/* Service Popularity */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-4">Popular Services</h3>
          <Doughnut 
            data={serviceChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: 'white' }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}