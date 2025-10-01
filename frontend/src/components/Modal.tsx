"use client"

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function Modal({ children, setShowModal }: { children: React.ReactNode, setShowModal: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-end">
          <X className="cursor-pointer" onClick={() => setShowModal(false)} />
        </div>
        {children}
      </div>
    </div>
  );
}