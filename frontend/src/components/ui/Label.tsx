

import { cn } from "@/lib/utils";

interface LabelProps {
    className?: string; // The className prop is just a string
    label: string;
    id: string;
}


export function Label({ className, label, id }: LabelProps) {
    // cn() merges the default classes with the passed-in className.
    // If className contains a conflicting class (e.g., text-4xl),
    // it will correctly override the default (text-7xl).
    return (
        <>
            <label htmlFor={id} className={cn("block text-sm font-bold text-white", className)}>{label}</label>
        </>
    )
}