"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  url: string;
};

const BottomSheet = ({ isOpen, onClose, name, description, url }: Props) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOpenUrl = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,30%)] duration-300 z-40 ${
          isAnimating ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 h-[70vh] w-sm bg-white rounded-t-2xl shadow-lg z-50 transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6">
          {/* Handle bar */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">{name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleOpenUrl}
            className="w-full py-3 bottom-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {t("go_to_dapp")}
          </button>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
