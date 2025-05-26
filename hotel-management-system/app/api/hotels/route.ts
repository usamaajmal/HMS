// hotel-management-system/app/api/hotels/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { query } from '@/lib/db'; // Placeholder for database interaction

// Define the expected structure of the hotel data payload
interface HotelCreatePayload {
  name: string;
  description: string;
  price: number;
  amenities: string[];
  imageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse the request body
    const body = await request.json();
    const hotelData = body as HotelCreatePayload; // Basic type assertion

    // 2. Validate the data (basic example)
    if (!hotelData.name || !hotelData.price || !hotelData.description) {
      return NextResponse.json(
        { message: 'Missing required fields (name, price, description)' },
        { status: 400 }
      );
    }

    // 3. Log the received data (simulating processing)
    console.log('Received hotel data:', hotelData);

    // 4. Simulate database insertion (replace with actual DB logic later)
    // For example, using the placeholder query function:
    // await query('INSERT INTO hotels (name, description, price, amenities, image_url) VALUES ($1, $2, $3, $4, $5)',
    //   [hotelData.name, hotelData.description, hotelData.price, hotelData.amenities, hotelData.imageUrl]);
    console.log('Simulating save to database with data:', hotelData);
    const simulatedId = `hotel_${Date.now()}`; // Simulate a generated ID

    // 5. Return a success response
    return NextResponse.json(
      {
        message: 'Hotel data received and processed successfully (simulated).',
        hotelId: simulatedId, // Send back a simulated ID
        data: hotelData,
      },
      { status: 201 } // 201 Created status
    );

  } catch (error) {
    console.error('Error processing POST request:', error);

    // Handle JSON parsing errors or other unexpected errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler for this route as well, if needed for listing or testing.
// For now, focusing on the POST as per the plan.
export async function GET() {
  // Placeholder for fetching all hotels
  return NextResponse.json({ message: 'GET request to /api/hotels - Not implemented for fetching list yet, but route exists.' });
}
