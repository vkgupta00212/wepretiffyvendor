import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import GetUser from "../backend/authentication/getuser";
import GetWallet from "../backend/getwallet/getwallet";
import { IoMdCart } from "react-icons/io";
import logo from "../assets/logo.jpg";
import LoginCard from "./ui/loginCard";
import OtpVerification from "./ui/otpverification";

const Navigation = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState([]);
  const phone = localStorage.getItem("userPhone");
  const [wallet, setWallet] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showregistermodel, setShowRegisterModel] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (showLoginModal || showOtpModal || showregistermodel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showLoginModal, showOtpModal, showregistermodel]);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const fetchedUser = await GetUser(phone);
        console.log("Fetched from the Navigation ", { fetchedUser });
        setUser(fetchedUser || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (phone) fetchuser();
  }, [phone]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await GetWallet(phone);
        console.log("Fetched from the Navigation ", { data });
        setWallet(data || []);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };
    if (phone) fetchWallet();
  }, [phone]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userPhone");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Handle login button click with delay
  const handleLoginClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowLoginModal(true);
    }, 500);
  };

  // Handle login form submission with delay
  const handleLoginSubmit = (phone) => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhoneNumber(phone);
      setShowLoginModal(false);
      setIsProcessing(false);
      setShowOtpModal(true);
    }, 500);
  };

  // Handle OTP verification success
  const handleOtpVerified = () => {
    setShowOtpModal(false);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPhone", phoneNumber);
    navigate("/register"); // Navigate to /register after OTP verification
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm ${
          showLoginModal || showOtpModal || showregistermodel
            ? "pointer-events-none"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[80px]">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer group space-x-3"
            >
              <img
                src={logo}
                alt="WePrettify Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  weprettifyvendor
                </span>
                <span className="text-sm md:text-base font-medium text-gray-600 mt-1 group-hover:text-indigo-600 transition-colors duration-300">
                  Be the best version of you
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/course", label: "Courses" },
              ].map((item) =>
                item.to.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.to}
                    className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              )}

              {isLoggedIn ? (
                /* Profile Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center space-x-3 cursor-pointer select-none group"
                    onClick={() => setOpen(!open)}
                  >
                    <img
                      src={
                        user[0]?.Image
                          ? `https://api.weprettify.com/images/${user[0].Image}`
                          : "https://via.placeholder.com/150?text=Avatar"
                      }
                      alt={user[0]?.Fullname || "Profile"}
                      className="w-11 h-11 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 transition-all duration-300"
                    />
                    <span className="text-base font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                      {user[0]?.Fullname || ""}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-all duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {open && (
                    <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl w-56 z-50 text-sm border border-gray-100 transform transition-all duration-300 scale-95 origin-top-right animate-in">
                      <Link
                        to="/userprofile"
                        className="block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-gray-700 first:rounded-t-xl"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/vendorverification"
                        className="flex justify-between block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-gray-700 first:rounded-t-xl"
                      >
                        <span>Verification</span>
                      </Link>
                      <Link
                        to="/transactions"
                        className="flex justify-between items-center px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-gray-700 first:rounded-t-xl"
                      >
                        <span>Wallet</span>
                        <span className="font-semibold text-indigo-600">
                          ₹{wallet[0]?.WalletBalance || 0}
                        </span>
                      </Link>
                      <Link
                        to="/contact"
                        className="flex justify-between block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-gray-700 first:rounded-t-xl"
                      >
                        <span>Contact</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-red-500 last:rounded-b-xl"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login Button */
                <button
                  onClick={handleLoginClick}
                  disabled={isProcessing}
                  className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing ? "Processing..." : "Get Started"}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Login Modal ===== */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto"
            aria-modal="true"
            role="dialog"
          >
            <FocusTrap>
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md relative pointer-events-auto"
              >
                <LoginCard
                  onClose={() => setShowLoginModal(false)}
                  onSubmit={handleLoginSubmit}
                />
              </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== OTP Modal ===== */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto"
            aria-modal="true"
            role="dialog"
          >
            <FocusTrap>
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md relative pointer-events-auto"
              >
                <OtpVerification
                  phone={phoneNumber}
                  onClose={() => setShowOtpModal(false)}
                  onVerified={handleOtpVerified}
                />
              </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
