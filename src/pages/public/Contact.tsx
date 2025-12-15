import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-chart-3 text-foreground">
      {/* Hero Section */}
<section className="relative bg-primary text-primary-foreground py-20 px-6 text-center overflow-hidden">
  {/* Animated Emoji Convoy */}
  <div className="absolute inset-0">
    {Array.from({ length: 1 }).map((_, i) => (
      <span
        key={i}
        className="text-9xl absolute"
        style={{
          top: "50%",
          left: 0,
          animation: "slideLeft 7s linear infinite",
          animationDelay: `${i * 1}s`, // প্রতিটি emoji আলাদা delay
        }}
      >
        🚚
      </span>
    ))}
  </div>

  {/* Content */}
  <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-4">
    Contact Us 📞
  </h1>
  <p className="relative z-10 text-lg md:text-xl max-w-3xl mx-auto">
    Have questions about your parcel? We’re here to help you 24/7.
  </p>

  {/* Inline Keyframes */}
  <style>{`
    @keyframes slideLeft {
      0% { transform: translateX(120vw); }  
      100% { transform: translateX(-120vw); } 
    }
  `}</style>
</section>


      {/* Contact Info */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">📍 Office Address</h2>
          <p>123 Delivery Street, Dhaka, Bangladesh</p>
        </div>
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">📧 Email</h2>
          <p>support@parcelpro.com</p>
        </div>
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">📱 Phone</h2>
          <p>+880 1234-567890</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#07a39b] text-primary-foreground py-16 px-6">
        <div className="max-w-3xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Send us a Message ✉️
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <p>© 2025 ParcelPro Delivery. All rights reserved.</p>
      </footer>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Contact;
