import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Profile } from './Auth/Profile';
import { ChevronDown, LogOut, User, Sparkles } from 'lucide-react';
import { motion } from "motion/react";

export function Header({ currentStep, onNavigate }) {
  const { user, logout } = useAuth() || {};
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 py-3 sm:py-4 pointer-events-none"
    >
      <div className="w-full max-w-6xl flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2.5rem] px-2 py-2 pointer-events-auto ring-1 ring-black/[0.03]">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 group cursor-pointer pl-4 mr-4"
          onClick={() => onNavigate("Home")}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="hidden sm:block text-xl font-black text-gray-900 tracking-tighter font-display">
            HUMAIRE
          </span>
        </motion.div>

        {/* Center: Navigation (Hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-1">
          {["Home", "About Us"].map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-4 pr-1">
          {currentStep > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="hidden md:flex bg-blue-50/50 border border-blue-100 pr-3 pl-2 py-1.5 rounded-full items-center gap-2 mr-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">AI Status</span>
            </motion.div>
          )}

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-gray-50/50 border border-gray-100/50 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-gray-800 hidden sm:inline-block max-w-[80px] truncate">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_48px_rgba(0,0,0,0.12)] border border-gray-100 py-2 animate-in fade-in slide-in-from-top-4 duration-300 origin-top-right">
                  <div className="px-5 py-4 border-b border-gray-50">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Account</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfile(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors"
                    >
                      <User className="w-4.5 h-4.5 text-gray-400" />
                      Your Profile
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                    >
                      <LogOut className="w-4.5 h-4.5 text-red-400" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
                onClick={() => setShowLogin(true)}
              >
                Sign in
              </button>
              <button
                className="text-sm font-black text-white bg-blue-600 hover:bg-black px-6 py-3 rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px] active:scale-95"
                onClick={() => setShowRegister(true)}
              >
                Get started
              </button>
            </div>
          )}
        </div>
      </div>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </motion.header>
  );
}