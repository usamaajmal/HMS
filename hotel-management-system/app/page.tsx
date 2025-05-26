"use client";
// hotel-management-system/app/page.tsx (Originally HotelListingPage)
import Link from 'next/link'; // Import Link
import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

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
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('Any');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const filterHotels = () => {
    return placeholderHotels.filter((hotel) => {
      // Search filter
      const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase());
      // Price filter
      let matchesPrice = true;
      if (priceRange !== 'Any') {
        const [min, max] = priceRange
          .replace('$', '')
          .replace('+', '')
          .split(' - ')
          .map((v) => parseInt(v));
        if (priceRange.includes('+')) {
          matchesPrice = hotel.price >= min;
        } else {
          matchesPrice = hotel.price >= min && hotel.price <= max;
        }
      }
      // Amenities filter
      const matchesAmenities = selectedAmenities.every((a) => hotel.amenities.includes(a));
      return matchesSearch && matchesPrice && matchesAmenities;
    });
  };

  const filteredHotels = filterHotels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-10 text-indigo-800 text-center tracking-tight drop-shadow">
          🏨 Hotel Listings
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4 w-full bg-white/80 border border-indigo-100 rounded-2xl shadow-lg p-6 backdrop-blur-md mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-6">
              {(FaFilter as any)({ className: "text-indigo-500 text-xl" })}
              <h2 className="text-2xl font-semibold text-indigo-700">Search & Filters</h2>
            </div>
            <div className="space-y-6">
              {/* Search Input */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Hotels
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="e.g., Grand Hyatt"
                    className="block w-full px-4 py-2 border border-indigo-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition pr-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {(FaSearch as any)({ className: "absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400" })}
                </div>
              </div>
              {/* Price Range Filter */}
              <div>
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  id="price-range"
                  className="block w-full px-4 py-2 border border-indigo-200 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Pool', 'Wi-Fi', 'Parking', 'Gym', 'Spa'].map((amenity) => (
                    <label key={amenity} className="flex items-center bg-indigo-50 px-3 py-1 rounded-full shadow-sm cursor-pointer hover:bg-indigo-100 transition">
                      <input
                        id={`amenity-${amenity.toLowerCase()}`}
                        name={`amenity-${amenity.toLowerCase()}`}
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <span className="text-sm text-indigo-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          {/* Hotel Cards Grid */}
          <main className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-indigo-800">Available Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHotels.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No hotels found.</div>
              ) : (
                filteredHotels.map((hotel) => (
                  <Link
                    href={`/hotels/${hotel.id}`}
                    key={hotel.id}
                    className="group block bg-white border border-indigo-100 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col justify-between hover:-translate-y-1 hover:bg-indigo-50"
                    legacyBehavior={false}
                  >
                    <div className="flex flex-col h-full">
                      {/* Image Placeholder */}
                      <div className="h-40 bg-gradient-to-tr from-indigo-200 via-indigo-100 to-white rounded-xl flex items-center justify-center mb-4">
                        <span className="text-indigo-400 text-lg">Hotel Image</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-indigo-700 group-hover:text-indigo-900 transition">{hotel.name}</h3>
                      <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold text-indigo-600">${hotel.price}</span>
                        <span className="text-gray-500"> /night</span>
                      </p>
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-600">Amenities:</h4>
                        <ul className="flex flex-wrap gap-2 mt-1">
                          {hotel.amenities.map((amenity) => (
                            <li key={amenity} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-grow"></div>
                      <p className="text-indigo-600 group-hover:text-indigo-800 font-semibold mt-4 self-start transition">
                        View Details &rarr;
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
