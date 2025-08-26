// src/app/contact/page.js

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">About Me</h1>
          <p className="text-blue-100">Get to know me better</p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center p-6 gap-6">
          
          {/* Profile Image */}
          <img
            src=".\images\contact\rohitcontachimage.jpg"
            alt="Rohit Wazarkar"
            className="w-60 h-60 rounded-half border-4 border-blue-600 shadow-lg"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Rohit Wazarkar
            </h2>
            <p className="text-gray-600 mb-4">
              Experienced Software Developer specializing in <span className="font-semibold">.NET, React, and Next.js</span>. 
              Passionate about building scalable applications and delivering business value through technology.
            </p>

            <div className="space-y-2">
              <p className="text-gray-700">
                📍 <span className="font-medium">Address:</span> Pune, Maharashtra, India
              </p>
              <p className="text-gray-700">
                📞 <span className="font-medium">Mobile:</span> +91 98765 43210
              </p>
              <p className="text-gray-700">
                💼 <span className="font-medium">Experience:</span> 1.9 years at KFintech as .NET & React Developer
              </p>
              <p className="text-gray-700">
                🚀 <span className="font-medium">Current Focus:</span> Full-stack development with Next.js
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-gray-600 text-sm">
          © 2025 Rohit Wazarkar | Built with ❤️ using Next.js
        </div>
      </div>
    </div>
  );
}
