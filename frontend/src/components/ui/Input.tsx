/**
 * @author Udaya Kiran Gonuguntla
 * @description Input component with customizable styles and behavior
 * @param {string} className - Additional class names for styling
 * @param {string} placeholder - Placeholder text for the input
 * @param {string} name - Name attribute for the input
 * @param {string} id - ID attribute for the input
 * @param {string} type - Type attribute for the input (e.g., text, number)
 * @param {string | number} value - Value of the input
 * @param {(e: React.ChangeEvent<HTMLInputElement>) = void} onChange - Change handler for the input
 * @returns {JSX.Element} The Input component
 */

import { cn } from "@/lib/utils";

interface InputProps {
    className?: string; // The className prop is just a string
    placeholder: string;
    name: string;
    id: string;
    type: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export function Input({ className, placeholder, name, id, type, value, onChange }: InputProps) {
    // cn() merges the default classes with the passed-in className.
    // If className contains a conflicting class (e.g., text-4xl),
    // it will correctly override the default (text-7xl).
    return (
        <>
            <input
                className={cn("w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition", className)}
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
            />
        </>
    )
}