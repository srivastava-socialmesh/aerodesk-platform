export function OccupancyAnalytics() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Occupancy Analytics</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span>Current Occupancy</span>
            <span className="font-semibold">78%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Projected Week</span>
            <span className="font-semibold">82%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
