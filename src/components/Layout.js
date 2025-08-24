import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Scrollable Main */}
      <main className="flex-grow overflow-y-auto pt-16 pb-12 bg-gray-50">
        {children}
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white text-center py-3 z-50">
        © 2025 StayFeast. All rights reserved -- Created By Mr.Rohit Wazarkar . 
      </footer>
    </div>
  );
}

