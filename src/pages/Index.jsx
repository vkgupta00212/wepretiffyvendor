import React, { useState, Suspense } from "react";
import Footer from "../component/Footer";
import MyOrder from "../component/vendor/orderedscreen";
import TabBar from "../component/vendor/tab";
import PendingScreen from "../component/vendor/pendingscreen";
import DeclinedScreen from "../component/vendor/declinedscreen";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("pending");

  const renderContent = () => {
    switch (selectedTab) {
      case "pending":
        return <PendingScreen status="pending" />;
      case "accepted":
        return <MyOrder status="accepted" />;
      case "declined":
        return <DeclinedScreen status="declined" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white p-4">
        {/* Tab bar with change handler */}
        <TabBar onTabChange={setSelectedTab} />

        {/* Render the selected tab's content */}
        <div className="mt-6">
          <Suspense fallback={<div>Loading...</div>}>
            {renderContent()}
          </Suspense>
        </div>
      </section>

      <footer className="mt-8 bg-gray-100 z-10 md:hidden">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
