"use client";

import { CircleCheckBig, X } from "lucide-react";
import { createContext, useContext, useState } from "react";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showAlert = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  const clearAlert = () => setMessage(null);

  return (
    <AlertContext.Provider value={{ message, showAlert, clearAlert }}>
      {children}

      {message && (
        <div className="fixed bottom-4 text-sm md:text-base flex items-center gap-3 left-1/2 whitespace-nowrap -translate-x-1/2 bg-[#0d2a1f] text-green-300 px-5 py-3 rounded-xl shadow-2xl z-50000">
          <CircleCheckBig size={20} />
          {message}
          <button onClick={clearAlert} className="ml-2">
            <X
              size={28}
              className="cursor-pointer hover:bg-[#fff]/10 rounded-full p-[4px] transition-all duration-300"
            />
          </button>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
