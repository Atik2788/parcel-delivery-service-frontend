import React from "react";

const About = () => {
  return (
    <div className="relative min-h-screen bg-chart-3 text-foreground overflow-hidden">
      {/* Emoji Background Layer */}
      <div className="absolute inset-0 flex flex-wrap opacity-10 animate-pulse">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            className="text-6xl m-4 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            📦
          </span>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About ParcelPro Delivery 📦
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We are committed to making parcel delivery faster, safer, and more reliable for everyone.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-card text-card-foreground shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">🚀 Our Mission</h2>
            <p>
              To revolutionize parcel delivery by combining speed, security, and wide coverage.
            </p>
          </div>
          <div className="bg-card text-card-foreground shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">🌍 Our Vision</h2>
            <p>
              Building a connected world where sending and receiving parcels is effortless.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
