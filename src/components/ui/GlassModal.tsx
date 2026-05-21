"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { GlassPanel } from "./GlassPanel";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const GlassModal = ({ isOpen, onClose, children }: GlassModalProps) => {
  // Lock background scrolling when the modal is active
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Animated Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />
          
          {/* Hardware Accelerated Modal Scale-in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl z-10"
          >
            <GlassPanel className="p-10 border border-white/10 bg-surface/80 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              {children}
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};