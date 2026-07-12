'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose?: () => void;
}

export default function Toast({
                                  message,
                                  type = 'info',
                                  duration = 3000,
                                  onClose
                              }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const colors = {
        success: 'bg-green-50 border-green-500 text-green-800',
        error: 'bg-red-50 border-red-500 text-red-800',
        info: 'bg-blue-50 border-blue-500 text-blue-800',
    };

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg border-2 shadow-lg max-w-md w-full ${colors[type]}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{icons[type]}</span>
                        <p className="font-medium">{message}</p>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                if (onClose) onClose();
                            }}
                            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Close notification"
                        >
                            ✕
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
