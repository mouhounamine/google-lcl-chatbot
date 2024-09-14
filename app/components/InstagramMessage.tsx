import React from "react";

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
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md max-w-md">
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
    </div>
  );
};

export default InstagramMessage;
