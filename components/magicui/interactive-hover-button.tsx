"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface InteractiveHoverButtonProps {
  text: string;
  href: string;
  className?: string;
  children?: ReactNode;
  showIcon?: boolean;
}

export default function InteractiveHoverButton({
  text,
  href,
  className,
  children,
  showIcon = false,
}: InteractiveHoverButtonProps) {
  return (
    <Link href={href} className="group relative inline-block">
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-blue-600 bg-transparent px-8 py-4 text-base font-semibold text-blue-600 transition-all duration-300 ease-out",
          "dark:border-blue-400 dark:text-blue-400",
          "group-hover:text-white dark:group-hover:text-white",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{
            type: "tween",
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
        
        {/* Text content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {text}
          {showIcon && (
            <motion.div
              initial={{ x: 0, opacity: 0.7 }}
              whileHover={{ 
                x: 3, 
                opacity: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }
              }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink size={16} className="transition-transform duration-200" />
            </motion.div>
          )}
          {children}
        </span>
        
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-700/20 opacity-0 blur-sm"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}
