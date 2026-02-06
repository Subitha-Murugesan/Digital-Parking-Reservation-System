import { QrCode, Calendar, MapPin, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';

export function MyReservations() {
  const [showQR, setShowQR] = useState<string | null>(null);

  // Mock data - in production this would come from a database
  const reservations = [
    {
      id: 'RES-001',
      spaceNumber: 'A015',
      zone: 'A',
      date: '2026-01-20',
      startTime: '09:00',
      endTime: '17:00',
      licensePlate: 'ABC-1234',
      price: 24.00,
      qrCode: 'QR-A7B9C2D4',
      status: 'active'
    },
    {
      id: 'RES-002',
      spaceNumber: 'B023',
      zone: 'B',
      date: '2026-01-22',
      startTime: '14:00',
      endTime: '18:00',
      licensePlate: 'ABC-1234',
      price: 12.00,
      qrCode: 'QR-E5F8G1H3',
      status: 'active'
    }
  ];

  const pastReservations = [
    {
      id: 'RES-000',
      spaceNumber: 'C012',
      zone: 'C',
      date: '2026-01-15',
      startTime: '10:00',
      endTime: '15:00',
      price: 15.00,
      status: 'completed'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage your parking reservations</p>
      </div>

      {/* Active Reservations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming</h2>
        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No upcoming reservations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <span className="text-sm text-gray-500">{reservation.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600">Space</p>
                          <p className="font-semibold text-gray-900">{reservation.spaceNumber}</p>
                          <p className="text-xs text-gray-500">Zone {reservation.zone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600">Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(reservation.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-600">Time</p>
                          <p className="font-semibold text-gray-900">
                            {reservation.startTime} - {reservation.endTime}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600">License Plate</p>
                        <p className="font-semibold text-gray-900">{reservation.licensePlate}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Paid: </span>
                      <span className="text-lg font-bold text-gray-900">€{reservation.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <button
                      onClick={() => setShowQR(showQR === reservation.id ? null : reservation.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 whitespace-nowrap"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>QR Code</span>
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center space-x-2 whitespace-nowrap">
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>

                {showQR === reservation.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <div className="bg-gray-50 p-6 rounded-lg inline-block border border-gray-300">
                      <QrCode className="w-48 h-48 text-gray-800 mx-auto" />
                      <p className="text-sm text-gray-600 mt-3 font-mono">{reservation.qrCode}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Scan this code at the parking entrance
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Reservations */}
      {pastReservations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Bookings</h2>
          <div className="space-y-4">
            {pastReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 opacity-60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Completed
                      </span>
                      <span className="text-sm text-gray-500">{reservation.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Space</p>
                        <p className="font-medium text-gray-900">{reservation.spaceNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(reservation.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time</p>
                        <p className="font-medium text-gray-900">
                          {reservation.startTime} - {reservation.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Paid</p>
                        <p className="font-medium text-gray-900">€{reservation.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
