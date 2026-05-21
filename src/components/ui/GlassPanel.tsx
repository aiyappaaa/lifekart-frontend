import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassPanel = ({ children, className, hoverEffect = false }: GlassPanelProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-glass border border-glass-border shadow-glass backdrop-blur-xl",
        hoverEffect && "transition-all duration-500 hover:shadow-glow hover:bg-white/[0.04]",
        className
      )}
    >
      {/* Top inner highlight simulating light hitting glass */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};