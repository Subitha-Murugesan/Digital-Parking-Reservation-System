import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ReservationFlow } from './components/ReservationFlow';
import { MyReservations } from './components/MyReservations';
import { Navigation } from './components/Navigation';

export type UserGroup = 'resident' | 'employee' | 'customer' | 'visitor';

export interface ParkingSpace {
  id: string;
  zone: string;
  number: string;
  type: 'standard' | 'ev-charging';
  status: 'available' | 'occupied' | 'reserved';
}

export interface Reservation {
  id: string;
  spaceNumber: string;
  startDate: string;
  startTime: string;
  endTime: string;
  licensePlate: string;
  price: number;
  qrCode: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reserve' | 'myreservations'>('dashboard');
  const [userGroup, setUserGroup] = useState<UserGroup>('visitor');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userGroup={userGroup}
        onUserGroupChange={setUserGroup}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {currentView === 'dashboard' && <Dashboard userGroup={userGroup} />}
        {currentView === 'reserve' && <ReservationFlow userGroup={userGroup} />}
        {currentView === 'myreservations' && <MyReservations />}
      </main>
    </div>
  );
}