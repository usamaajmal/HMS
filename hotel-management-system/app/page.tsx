// hotel-management-system/app/page.tsx (Originally HotelListingPage)
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

// Renamed from HotelListingPage to HomePage
export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Listings</h1>

      <div className="md:flex md:space-x-6"> {/* Main flex container for columns */}
        {/* Left Column: Filters */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="p-4 border rounded-lg shadow-sm sticky top-4"> {/* Made filters sticky */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Search & Filters</h2> {/* Updated heading style */}
            {/* The existing grid for filter items can remain as is, or be reflowed if needed */}
            <div className="grid grid-cols-1 gap-4"> {/* Changed to single column for filters */}
              {/* Search Input */}
              <div>
                <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-1"> {/* Updated label style */}
                  Search Hotels
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="e.g., Grand Hyatt"
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Increased py-2.5
                />
              </div>

              {/* Price Range Filter */}
              <div>
                <label htmlFor="price-range" className="block text-sm font-semibold text-gray-700 mb-1"> {/* Updated label style */}
                  Price Range
                </label>
                <select
                  id="price-range"
                  className="mt-1 block w-full px-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Increased py-2.5
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label> {/* Updated label style and mb-2 */}
                <div className="mt-2 space-y-2"> {/* Changed to space-y-2 */}
                  {['Pool', 'Wi-Fi', 'Parking', 'Gym', 'Spa'].map((amenity) => (
                    <div key={amenity} className="flex items-center mb-1"> {/* Added mb-1 for spacing between items if needed, though space-y-2 on parent might be enough */}
                      <input
                        id={`amenity-${amenity.toLowerCase()}`}
                        name={`amenity-${amenity.toLowerCase()}`}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={`amenity-${amenity.toLowerCase()}`} className="ml-2 block text-sm text-gray-800"> {/* Updated text color */}
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hotel List */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Hotels</h2> {/* Matched style with Filters heading */}
          {/* The grid for hotel cards can remain, but its column count might need adjustment based on the new parent width.
              md:grid-cols-2 lg:grid-cols-3 might become md:grid-cols-1 lg:grid-cols-2 if space is tighter.
              For this example, keeping it as is, but this is a point of attention.
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> {/* Adjusted grid for hotel cards */}
            {placeholderHotels.map((hotel) => (
              <Link
                href={`/hotels/${hotel.id}`}
                key={hotel.id}
                className="block rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden" // Added overflow-hidden for rounded corners on image
                legacyBehavior={false}
              >
                <div className="flex flex-col h-full"> {/* Ensures button can be at bottom */}
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    {/* Using a simple span for placeholder text, as img might be blocked */}
                    <span className="text-gray-500">Hotel Image Placeholder</span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-grow flex flex-col"> {/* flex-grow allows this section to expand, added flex flex-col */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-3"> {/* Increased bottom margin slightly */}
                      ${hotel.price}<span className="text-sm font-normal text-gray-500">/night</span>
                    </p>
                    <div className="mb-3"> {/* Increased bottom margin slightly */}
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Amenities:</h4>
                      <div className="flex flex-wrap">
                        {hotel.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-block bg-gray-100 text-gray-600 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full" // Made tags rounded-full and adjusted padding
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Spacer to push button to bottom if content is short */}
                    <div className="flex-grow"></div>
                  </div>

                  {/* View Details Button - Placed within its own div for margin */}
                  <div className="p-4 pt-0"> {/* Padding for button container, removed top padding */}
                    <div className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-150 text-center w-full cursor-pointer">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
