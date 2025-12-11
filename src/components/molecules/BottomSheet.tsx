"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ListIcon from "../atoms/ListIcon";
import Close from "@/src/assets/svg/Close";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  url: string;
  src: string;
};

const BottomSheet = ({
  isOpen,
  onClose,
  name,
  description,
  url,
  src,
}: Props) => {
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
          <div className="flex justify-end mb-4">
            <button onClick={handleClose}>
              <Close />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-start">
              <ListIcon src={src} alt="" />
              <h2 className="text-xl font-bold mb-3">{name}</h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Descript</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="fixed left-0 bottom-3 w-full flex justify-center items-center">
            <button
              onClick={handleOpenUrl}
              className="w-52 py-3 bg-green-600 text-white rounded-4xl transition-colors font-medium"
            >
              {t("go_to_dapp")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
