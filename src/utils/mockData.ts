import type { ParkingSpace, UserGroup } from '../App';

export function getMockParkingData(): ParkingSpace[] {
  const zones = ['A', 'B', 'C', 'D'];
  const spaces: ParkingSpace[] = [];
  
  let spaceCounter = 1;
  
  for (const zone of zones) {
    const spacesInZone = 15; // 15 spaces per zone
    
    for (let i = 0; i < spacesInZone; i++) {
      const spaceNumber = `${zone}${String(spaceCounter).padStart(3, '0')}`;
      
      // 20% chance of EV charging
      const type: ParkingSpace['type'] = Math.random() > 0.8 ? 'ev-charging' : 'standard';
      
      // Random status - simulate varying occupancy
      const statusRand = Math.random();
      let status: ParkingSpace['status'] = 'available';
      if (statusRand > 0.65) status = 'occupied';
      else if (statusRand > 0.50) status = 'reserved';
      
      spaces.push({
        id: `space-${spaceCounter}`,
        zone,
        number: spaceNumber,
        type,
        status
      });
      
      spaceCounter++;
    }
  }
  
  return spaces;
}

export type DemandLevel = 'low' | 'medium' | 'high';

export function getDemandLevel(available: number, total: number): DemandLevel {
  const occupancyRate = ((total - available) / total) * 100;
  
  if (occupancyRate >= 80) return 'high';
  if (occupancyRate >= 60) return 'medium';
  return 'low';
}

// Base rates for different user groups
const baseRates: Record<UserGroup, number> = {
  resident: 2.00,  // Lowest rate for residents
  employee: 2.50,  // Discounted for employees
  customer: 3.50,  // Standard for customers
  visitor: 4.00    // Highest for visitors
};

export function getPriceForUserGroup(userGroup: UserGroup, demand: DemandLevel) {
  const baseRate = baseRates[userGroup];
  
  // Dynamic pricing multiplier based on demand
  let multiplier = 1.0;
  if (demand === 'high') multiplier = 1.5;
  else if (demand === 'medium') multiplier = 1.25;
  
  const currentRate = baseRate * multiplier;
  
  return {
    baseRate: Number(baseRate.toFixed(2)),
    currentRate: Number(currentRate.toFixed(2)),
    multiplier
  };
}

export function calculatePrice(
  startTime: string, 
  endTime: string, 
  userGroup: UserGroup,
  demand: DemandLevel
): number {
  if (!startTime || !endTime) return 0;
  
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  const durationMinutes = endMinutes - startMinutes;
  if (durationMinutes <= 0) return 0;
  
  const hours = durationMinutes / 60;
  
  const pricing = getPriceForUserGroup(userGroup, demand);
  
  return hours * pricing.currentRate;
}
