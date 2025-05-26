// hotel-management-system/app/hotels/page.tsx
import Link from 'next/link'; // Import Link

interface Hotel {
  id: string;
  name: string;
  price: number;
  amenities: string[];
}

const placeholderHotels: Hotel[] = [
  { id: '1', name: 'Grand Hyatt', price: 300, amenities: ['Pool', 'Wi-Fi', 'Gym'] },
  { id: '2', name: 'Comfort Inn', price: 150, amenities: ['Wi-Fi', 'Parking'] },
  { id: '3', name: 'Luxury Suites', price: 500, amenities: ['Pool', 'Wi-Fi', 'Spa', 'Gym'] },
];

export default function HotelListingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Listings</h1>

      {/* Search and Filters Section */}
      <div className="mb-8 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Search & Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Hotels
            </label>
            <input
              type="text"
              id="search"
              placeholder="e.g., Grand Hyatt"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select
              id="price-range"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Any</option>
              <option>$0 - $100</option>
              <option>$101 - $250</option>
              <option>$251 - $500</option>
              <option>$501+</option>
            </select>
          </div>

          {/* Amenities Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
            <div className="mt-2 space-y-1">
              {['Pool', 'Wi-Fi', 'Parking', 'Gym', 'Spa'].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    id={`amenity-${amenity.toLowerCase()}`}
                    name={`amenity-${amenity.toLowerCase()}`}
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`amenity-${amenity.toLowerCase()}`} className="ml-2 block text-sm text-gray-900">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel List Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderHotels.map((hotel) => (
            <Link href={`/hotels/${hotel.id}`} key={hotel.id} legacyBehavior={false}>
              <div className="block border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-indigo-700 hover:text-indigo-900">{hotel.name}</h3>
                  <p className="text-gray-700 mb-1">Price: ${hotel.price}/night</p>
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-600">Amenities:</h4>
                    <ul className="list-disc list-inside pl-4 text-sm text-gray-500">
                      {hotel.amenities.map((amenity) => (
                        <li key={amenity}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-indigo-600 hover:text-indigo-800 font-medium mt-2 self-start">
                  View Details &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
