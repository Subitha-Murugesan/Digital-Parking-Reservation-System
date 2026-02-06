import { Car, Calendar, List } from 'lucide-react';
import type { UserGroup } from '../App';

interface NavigationProps {
  currentView: 'dashboard' | 'reserve' | 'myreservations';
  onViewChange: (view: 'dashboard' | 'reserve' | 'myreservations') => void;
  userGroup: UserGroup;
  onUserGroupChange: (group: UserGroup) => void;
}

export function Navigation({ currentView, onViewChange, userGroup, onUserGroupChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">ParkSmart</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('reserve')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                currentView === 'reserve'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Parking</span>
            </button>
            <button
              onClick={() => onViewChange('myreservations')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                currentView === 'myreservations'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
              <span>My Bookings</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="userGroup" className="text-sm text-gray-600">
              I am a:
            </label>
            <select
              id="userGroup"
              value={userGroup}
              onChange={(e) => onUserGroupChange(e.target.value as UserGroup)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="resident">Resident</option>
              <option value="employee">Employee</option>
              <option value="customer">Customer</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}