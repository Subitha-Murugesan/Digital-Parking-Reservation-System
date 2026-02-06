import { Car, Zap, MapPin, TrendingUp, Bike } from 'lucide-react';
import { getMockParkingData, getDemandLevel, getPriceForUserGroup } from '../utils/mockData';
import type { UserGroup } from '../App';

interface DashboardProps {
  userGroup: UserGroup;
}

export function Dashboard({ userGroup }: DashboardProps) {
  const parkingData = getMockParkingData();

  const totalSpaces = parkingData.length;
  const availableSpaces = parkingData.filter(s => s.status === 'available').length;
  const occupancyRate = ((totalSpaces - availableSpaces) / totalSpaces * 100).toFixed(0);
  const evSpaces = parkingData.filter(s => s.type === 'ev-charging' && s.status === 'available').length;

  const demand = getDemandLevel(availableSpaces, totalSpaces);
  const pricing = getPriceForUserGroup(userGroup, demand);

  // Group by zone
  const zoneStats = parkingData.reduce((acc, space) => {
    if (!acc[space.zone]) {
      acc[space.zone] = { available: 0, total: 0 };
    }
    acc[space.zone].total++;
    if (space.status === 'available') {
      acc[space.zone].available++;
    }
    return acc;
  }, {} as Record<string, { available: number; total: number }>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Parking Availability</h1>
        <p className="text-gray-600 mt-1">Real-time parking space status</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Spaces</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{availableSpaces}</p>
              <p className="text-sm text-gray-500 mt-1">of {totalSpaces} total</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Car className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Demand</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{occupancyRate}%</p>
              <p className="text-sm text-gray-500 mt-1">
                {demand === 'high' && '🔴 High demand'}
                {demand === 'medium' && '🟡 Medium demand'}
                {demand === 'low' && '🟢 Low demand'}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">EV Charging</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{evSpaces}</p>
              <p className="text-sm text-gray-500 mt-1">charging spots free</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Info */}
      <div className={`border rounded-lg p-4 ${
        demand === 'high' ? 'bg-red-50 border-red-200' :
        demand === 'medium' ? 'bg-yellow-50 border-yellow-200' :
        'bg-green-50 border-green-200'
      }`}>
        <h3 className={`font-semibold mb-2 ${
          demand === 'high' ? 'text-red-900' :
          demand === 'medium' ? 'text-yellow-900' :
          'text-green-900'
        }`}>
          Your Pricing ({userGroup.charAt(0).toUpperCase() + userGroup.slice(1)})
        </h3>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ${
          demand === 'high' ? 'text-red-800' :
          demand === 'medium' ? 'text-yellow-800' :
          'text-green-800'
        }`}>
          <div>
            <span className="font-medium">Current Rate:</span> €{pricing.currentRate}/hour
          </div>
          <div>
            <span className="font-medium">Base Rate:</span> €{pricing.baseRate}/hour
          </div>
        </div>
        {pricing.currentRate > pricing.baseRate && (
          <p className={`text-xs mt-2 ${
            demand === 'high' ? 'text-red-700' :
            demand === 'medium' ? 'text-yellow-700' :
            'text-green-700'
          }`}>
            ⚠️ Dynamic pricing active due to {demand} demand
          </p>
        )}
      </div>

      {/* Zone Availability */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability by Zone</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(zoneStats).map(([zone, stats]) => (
            <div key={zone} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-900">Zone {zone}</span>
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Available: <span className="font-semibold text-green-600">{stats.available}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Total: <span className="font-semibold">{stats.total}</span>
                </p>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(stats.available / stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future: E-Bike Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bike className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Coming Soon: E-Bike & Cargo Bike Sharing</h3>
            <p className="text-sm text-gray-700">
              Reserve electric bikes and cargo e-bikes directly through this platform. Perfect for short trips and sustainable urban mobility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}