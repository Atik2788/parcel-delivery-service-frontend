import type { RootState } from "@/app/store";
import { useSelector, type TypedUseSelectorHook } from "react-redux";


const Home = () => {

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const user = useTypedSelector((state) => state.auth.user);
  console.log(user)

  return (
    <div className="min-h-screen bg-chart-3 text-foreground">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fast & Reliable Parcel Delivery 🚚
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Delivering your packages safely, on time, every time.
        </p>
        <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition">
          Book a Delivery
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">🚀 Fast Delivery</h2>
          <p>We ensure your parcels reach their destination quickly.</p>
        </div>
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">🔒 Secure Handling</h2>
          <p>Safety of your packages is our top priority.</p>
        </div>
        <div className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">🌍 Wide Coverage</h2>
          <p>We deliver across cities and rural areas nationwide.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#07a39b] text-primary-foreground py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to send your parcel?</h2>
        <p className="mb-6">Join thousands of happy customers today.</p>
        <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <p>© 2025 ParcelPro Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
