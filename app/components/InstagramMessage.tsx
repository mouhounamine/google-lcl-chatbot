import React from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./text-effect-generate";

interface InstagramMessageProps {
  avatarUrl: string;
  senderName: string;
  message: string;
  timestamp: string;
}

const InstagramMessage = ({
  avatarUrl,
  senderName,
  message,
  timestamp,
}: InstagramMessageProps) => {
  return (
    <motion.div
      className="flex items-start space-x-4 p-4 bg-slate-100 rounded-xl shadow-md max-w-md"
      initial={{ opacity: 0, z: 20 }} // Point de départ (invisible et en dessous)
      animate={{ opacity: 1, z: 0 }} // Animation vers l'état final (visible)
      transition={{ duration: 0.5 }} // Durée de l'animation
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <img
          src={avatarUrl}
          alt={senderName}
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>

      {/* Message and Details */}
      <div className="flex flex-col space-y-1">
        {/* Sender Name */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">{senderName}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>

        {/* Message Text */}
        <div className="text-gray-700 text-sm">{message}</div>
      </div>
    </motion.div>
  );
};

export default InstagramMessage;
