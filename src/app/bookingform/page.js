"use client";

export default function BookingFormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Guest Booking Form
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <select className="w-full px-4 text-black py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
            <option>Select Room Type</option>
            <option>Single</option>
            <option>Double</option>
            <option>Family</option>
            <option>Bungalow</option>
          </select>

          <button
            type="button"
            onClick={function () {alert("Booking Done Successfully !") ; 
                location.href = '/'
            }  }
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Pay & Book
          </button>
        </form>
      </div>
    </div>
  );
}
