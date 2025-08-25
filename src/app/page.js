"use client";
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {

 const router = useRouter();

  const handleNavigate = () => {
    router.push("/booking"); // Navigate to booking page
  };


  
  const handleNavigateForFood = () => {
    router.push("/menu");
  };

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Stay <span className="text-yellow-300">Feast</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Smart hotel & food management platform — making your stay and dining seamless.
          </p>
          <div className="flex justify-center space-x-4">
              <button
      onClick={handleNavigate}
      className="flex items-center gap-2 bg-yellow-300 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 hover:scale-105 transition transform duration-200"
    >
      <FaBed className="w-5 h-5" />
      Book Your Stay
    </button>
            <button onClick={handleNavigateForFood} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-200">
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose StayFeast?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🛏</div>
            <h3 className="text-xl font-semibold mb-2">Smart Room Management</h3>
            <p>Manage check-ins, availability, and guest bookings with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🍽</div>
            <h3 className="text-xl font-semibold mb-2">Integrated Food Services</h3>
            <p>Room service and restaurant orders — all in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
            <p>Track revenue, occupancy, and food sales in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure & Easy</h3>
            <p>Reliable, fast, and secure platform for guests & owners.</p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
             src=".\images\homeimages\h1.jpg"
            alt="Luxury Hotel Room"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Luxury Stays</h2>
          <p className="mb-6">
            Experience world-class comfort with our seamlessly managed rooms,
            designed for business and leisure.
          </p>
        <Link href="/rooms">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
    Explore Rooms
  </button>
</Link>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="md:order-2">
          <img
            src=".\images\homeimages\d1.jpg"
            alt="Delicious Dining"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="md:order-1">
          <h2 className="text-3xl font-bold mb-4">Delicious Dining</h2>
          <p className="mb-6">
            From room service to fine dining, StayFeast offers a curated food
            experience for every guest.
          </p>
          <button
      onClick={handleNavigateForFood}
      className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg shadow hover:bg-yellow-400 transition transform hover:scale-105 duration-200"
    >
      View Menu
    </button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to manage your hotel & restaurant smarter?</h2>
        <p className="mb-6">Join StayFeast today and upgrade your hospitality experience.</p>
        <button className="bg-yellow-300 text-blue-900 font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-400 transition duration-200">
          Get Started →
        </button>
      </section>
    </main>
  );
}

