import { Link } from "react-router-dom"
import { useEffect } from "react"

function Home() {
  useEffect(() => { document.title = "Glamour Salon | Home" }, [])
  return (
    <div>
      
      <div className="relative h-[80vh] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400"
          alt="Salon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Glamour Salon</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">Look good. Feel great. Every day.</p>
          <Link
            to="/book"
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-600"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      
      <div className="py-16 bg-white px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-12">Why Choose Us?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
          <div className="bg-pink-50 p-8 rounded-xl text-center w-full md:w-64">
            <p className="text-4xl mb-4">✂️</p>
            <h3 className="text-xl font-bold text-pink-600 mb-2">Expert Stylists</h3>
            <p className="text-gray-500">Professional team with years of experience</p>
          </div>
          <div className="bg-pink-50 p-8 rounded-xl text-center w-full md:w-64">
            <p className="text-4xl mb-4">💆</p>
            <h3 className="text-xl font-bold text-pink-600 mb-2">Relaxing Experience</h3>
            <p className="text-gray-500">Sit back and enjoy our premium services</p>
          </div>
          <div className="bg-pink-50 p-8 rounded-xl text-center w-full md:w-64">
            <p className="text-4xl mb-4">💰</p>
            <h3 className="text-xl font-bold text-pink-600 mb-2">Affordable Prices</h3>
            <p className="text-gray-500">Quality service at prices you'll love</p>
          </div>
        </div>
      </div>


      
      <div className="bg-pink-500 py-16 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for a new look?</h2>
        <p className="text-pink-100 mb-8">Book your appointment today and transform yourself</p>
        <Link
          to="/services"
          className="bg-white text-pink-500 px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-bold hover:bg-pink-50"
        >
          View Our Services
        </Link>
      </div>
      

      <div className="py-16 bg-pink-50 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">What Our Clients Say</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-500 mb-4">"Amazing experience! The staff is so professional and the results were incredible. I'll definitely be coming back!"</p>
            <p className="font-bold text-gray-700">— Sarah M.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-500 mb-4">"Best salon in town! My hair has never looked this good. The booking system is so easy to use too."</p>
            <p className="font-bold text-gray-700">— Emily R.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-yellow-400 text-xl mb-3">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-500 mb-4">"I got my bridal makeup done here and looked absolutely stunning on my wedding day. Highly recommended!"</p>
            <p className="font-bold text-gray-700">— Priya K.</p>
          </div>

        </div>
      </div>

      
      <div className="py-16 bg-white px-4">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">Find Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-xl">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-gray-700">Address</p>
                <p className="text-gray-500">Lakeside, Pokhara, Nepal</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-xl">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-gray-700">Phone</p>
                <p className="text-gray-500">+977 9800000000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-xl">
              <span className="text-2xl">✉️</span>
              <div>
                <p className="font-bold text-gray-700">Email</p>
                <p className="text-gray-500">glamour@salon.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-xl">
              <span className="text-2xl">🕐</span>
              <div>
                <p className="font-bold text-gray-700">Working Hours</p>
                <p className="text-gray-500">Monday - Saturday: 9AM - 7PM</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md h-72">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.5!2d83.9580!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDEyJzM0LjYiTiA4M8KwNTcnMjguOCJF!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home