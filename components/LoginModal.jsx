import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose, desc }) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />

          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="relative z-10 bg-[#1f1f1f] text-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
          >
            <div className="flex justify-between items-center pb-3 mb-2">
              <h2 className="text-lg font-semibold">
                Please{" "}
                <Link className="text-[#ab8bff] hover:underline" href="/login">
                  login
                </Link>{" "}
                first.
              </h2>
              <button
                onClick={onClose}
                className="text-white transition cursor-pointer hover:text-[#ab8bff] hover:bg-gray-500/10 font-bold w-8 h-8 rounded-full flex justify-center items-center"
              >
                ✕
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-200">{desc}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LoginModal;
