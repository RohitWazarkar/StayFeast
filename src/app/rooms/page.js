import Card from "@/components/Card";
import Link from "next/link";

export default function RoomsPage() {
  const rooms = [
    { title: "Single Room", description: "Perfect for solo travelers.", image: ".\\images\\Hotelrelatedimages\\SR.png" },
    { title: "Double Room", description: "Ideal for two guests.", image: ".\\images\\Hotelrelatedimages\\DR.jpg" },
    { title: "Family Room", description: "Spacious for families.", image: ".\\images\\Hotelrelatedimages\\FR.jpg" },
    { title: "1BHK Apartment", description: "Feels like home.", image: ".\\images\\Hotelrelatedimages\\OneBHK.jpeg" },
    { title: "Bungalow", description: "Luxury stay with privacy.", image: ".\\images\\Hotelrelatedimages\\Bunglow.webp" },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center text-black mb-10">
        Choose Your Stay
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, i) => (
          <Card key={i} title={room.title} description={room.description} image={room.image}>
            <Link href="/bookingform">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Book Now
        </button>
      </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
