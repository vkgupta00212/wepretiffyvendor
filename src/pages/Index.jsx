import React, { Suspense, lazy } from "react";
import Navigation from "../component/Navigation";
import HeroSection from "../component/HeroSection";
import PromoCard from "../component/PromocardSection";
import ServicesCarousel2 from "../component/ServicesCarousel2";
import ServicesCarousel4 from "../component/ServicesCarousel4";
import BecomeWePretiffyCard from "../component/ui/becomeweprettifycard";
import SpecialForYou from "../component/ui/specialyforyou";
import Footer from "../component/Footer";

const LazyServicesCarousel2 = lazy(() =>
  import("../component/ServicesCarousel2")
);
const LazyServicesCarousel4 = lazy(() =>
  import("../component/ServicesCarousel4")
);
const LazyBecomeWePretiffyCard = lazy(() =>
  import("../component/ui/becomeweprettifycard")
);
const LazySpecialForYou = lazy(() => import("../component/ui/specialyforyou"));

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white">
        <HeroSection />
      </section>

      {/* Promotions Section */}
      {/* <section className="bg-white">
        <div className="">
          <PromoCard />
        </div>
      </section> */}

      {/* Services Section */}
      {/* <section
        className="py-12 sm:py-16 bg-gray-50"
        aria-labelledby="services-heading"
      >
        <div className="">
          <Suspense fallback={<div className="" />}>
            <LazyServicesCarousel2 />
            <div className="">
              <LazyServicesCarousel4 />
            </div>
          </Suspense>
        </div>
      </section> */}
      {/* Become WePretiffy Vendor Section */}
      {/* <section
        className="py-12 sm:py-16 bg-pink-50"
        aria-labelledby="vendor-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="vendor-heading"
            className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6"
          >
            Become a WePretiffy Vendor
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            Join our growing community and offer your services to a wider
            audience. Fill in your details below and let's get started.
          </p>
          <Suspense
            fallback={
              <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
            }
          >
            <LazyBecomeWePretiffyCard />
          </Suspense>
        </div>
      </section> */}
      <footer className="mt-8 bg-gray-100 z-10 md:hidden">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
