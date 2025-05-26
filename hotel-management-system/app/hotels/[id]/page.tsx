// hotel-management-system/app/hotels/[id]/page.tsx

interface Hotel {
  id: string;
  name: string;
  description: string;
  price: number;
  amenities: string[];
  imageUrl?: string; // Optional
}

// Simulate fetching a hotel by ID. In a real app, this would be dynamic.
const getHotelDetails = (id: string): Hotel | undefined => {
  const sampleHotels: Hotel[] = [
    {
      id: '1',
      name: 'Grand Hyatt Deluxe',
      description: 'Experience unparalleled luxury and comfort at the Grand Hyatt, located in the heart of the city. Our deluxe rooms offer stunning views and world-class amenities.',
      price: 320,
      amenities: ['Pool', 'Wi-Fi', 'Gym', 'Room Service', 'Concierge'],
      imageUrl: 'https://via.placeholder.com/600x400.png?text=Grand+Hyatt+Deluxe',
    },
    {
      id: '2',
      name: 'Comfort Inn Downtown',
      description: 'A cozy and affordable option for travelers. Comfort Inn offers clean rooms and friendly service, conveniently located near major attractions.',
      price: 160,
      amenities: ['Wi-Fi', 'Parking', 'Breakfast Included'],
      imageUrl: 'https://via.placeholder.com/600x400.png?text=Comfort+Inn+Downtown',
    },
    {
      id: '3',
      name: 'Luxury Suites & Spa',
      description: 'Indulge in an oasis of tranquility and rejuvenation. Our suites provide ample space, and our spa services are renowned.',
      price: 550,
      amenities: ['Pool', 'Wi-Fi', 'Spa', 'Gym', 'Fine Dining'],
      imageUrl: 'https://via.placeholder.com/600x400.png?text=Luxury+Suites+%26+Spa',
    },
  ];
  return sampleHotels.find(hotel => hotel.id === id);
};

type HotelDetailsPageProps = {
  params: { id: string };
};

export default function HotelDetailsPage({ params }: HotelDetailsPageProps) {
  const hotel = getHotelDetails(params.id);

  if (!hotel) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Hotel Not Found</h1>
        <a href="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          &larr; Back to Listings
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back to Listings Link */}
      <a
        href="/"
        className="text-indigo-600 hover:text-indigo-800 mb-6 inline-block"
      >
        &larr; Back to Listings
      </a>

      {/* Hotel Name */}
      <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>

      {/* Image Placeholder */}
      {hotel.imageUrl && (
        <div className="mb-6">
          <img
            src={hotel.imageUrl}
            alt={`Image of ${hotel.name}`}
            className="w-full max-w-2xl h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      )}
      {!hotel.imageUrl && (
         <div className="mb-6 w-full max-w-2xl h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
            <p className="text-gray-500">Image not available</p>
         </div>
      )}


      {/* Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Price</h2>
        <p className="text-xl text-gray-800">${hotel.price} <span className="text-base text-gray-600">/ night</span></p>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
        <ul className="list-disc list-inside pl-5 space-y-1 text-gray-700">
          {hotel.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
