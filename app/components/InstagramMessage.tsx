import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface InstagramMessageProps {
  avatarUrl: string;
  senderName: string;
  message: string;
}

const InstagramMessage = ({
  avatarUrl,
  senderName,
  message,
}: InstagramMessageProps) => {
  const [timestamp, setTimestamp] = useState<string | null>(null);

  // Met à jour le timestamp uniquement côté client après hydratation
  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setTimestamp(currentTime);
  }, []);

  return (
    <motion.div
      className="flex items-start space-x-4 p-4 bg-slate-100 rounded-xl shadow-md max-w-md"
      initial={{ opacity: 0, y: 20 }} // Point de départ en dehors de l'écran
      animate={{ opacity: 1, y: 0 }} // Animation vers l'état visible
      transition={{ duration: 0.5, ease: "easeOut" }} // Douceur de l'animation
    >
      {/* Avatar Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Point de départ invisible et réduit
        animate={{ opacity: 1, scale: 1 }} // Animation vers l'état final (visible)
        transition={{ duration: 0.5 }} // Durée de l'animation
        className="flex-shrink-0"
      >
        <img
          src={avatarUrl}
          alt={senderName}
          className="h-10 w-10 rounded-full object-cover"
        />
      </motion.div>

      {/* Message and Details */}
      <div className="flex flex-col space-y-1">
        {/* Sender Name and Timestamp */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{senderName}</span>
          {timestamp && (
            <span className="text-xs text-gray-500">{timestamp}</span>
          )}
        </div>

        {/* Message Text */}
        <motion.div
          className="text-gray-700 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }} // Animation différée pour l'apparition du texte
        >
          {message}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InstagramMessage;
