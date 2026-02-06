import { useState } from 'react';
import { Calendar, Clock, Car, CheckCircle, QrCode } from 'lucide-react';
import { getMockParkingData, calculatePrice, getDemandLevel } from '../utils/mockData';
import type { UserGroup } from '../App';

interface ReservationFlowProps {
  userGroup: UserGroup;
}

export function ReservationFlow({ userGroup }: ReservationFlowProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const parkingData = getMockParkingData();
  const availableSpaces = parkingData.filter(s => s.status === 'available');

  const totalSpaces = parkingData.length;
  const availableCount = availableSpaces.length;
  const demand = getDemandLevel(availableCount, totalSpaces);

  const totalPrice = calculatePrice(startTime, endTime, userGroup, demand);
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    const id = 'RES-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setReservationId(id);
    setConfirmed(true);
  };

  const resetFlow = () => {
    setConfirmed(false);
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setSelectedSpace('');
    setLicensePlate('');
    setReservationId('');
  };

  if (confirmed) {
    const space = availableSpaces.find(s => s.id === selectedSpace);
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your parking space is reserved</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="bg-white p-6 rounded-lg mb-4 inline-block">
              <QrCode className="w-40 h-40 text-gray-800" />
            </div>
            <p className="text-sm text-gray-600 mb-4">Scan this QR code or use license plate recognition at entrance</p>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold">{reservationId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Space:</span>
                <span className="font-semibold">{space?.number} (Zone {space?.zone})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{selectedDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{startTime} - {endTime}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">License Plate:</span>
                <span className="font-semibold">{licensePlate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Paid:</span>
                <span className="text-lg font-bold text-blue-600">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetFlow}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Another Space
          </button>
        </div>
      </div>
    );
  }

  const canSubmit = selectedDate && startTime && endTime && selectedSpace && licensePlate.length >= 3;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Parking Space</h2>
        
        <div className="space-y-6">
          {/* Date & Time */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Date & Time</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Parking Space */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Select Space</h3>
            </div>
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a parking space...</option>
              {availableSpaces.map((space) => (
                <option key={space.id} value={space.id}>
                  Space {space.number} - Zone {space.zone}
                  {space.type === 'ev-charging' ? ' ⚡ (EV Charging)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Plate Number
            </label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              placeholder="ABC-1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for automatic license plate recognition at entry
            </p>
          </div>

          {/* Price Summary */}
          {startTime && endTime && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {userGroup.charAt(0).toUpperCase() + userGroup.slice(1)} rate
                    {demand !== 'low' && ' • Dynamic pricing applied'}
                  </p>
                </div>
                <p className="text-3xl font-bold text-blue-600">€{totalPrice.toFixed(2)}</p>
              </div>
              {demand !== 'low' && (
                <p className="text-xs text-orange-600 mt-2">
                  ⚠️ {demand === 'high' ? 'High' : 'Medium'} demand - prices may be higher than usual
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}