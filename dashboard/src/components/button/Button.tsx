import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Define the color variants as a type.
export type ButtonColor = 'Default' | 'Secondary' | 'Warning' | 'Information' | 'Success' | 'Danger';

// Define the component's props with TypeScript.
interface ButtonProps {
    label: string;
    icon?: IconDefinition; // Font Awesome icon is optional
    color?: ButtonColor;
    onClick?: () => void;
}

// Map the color prop to Tailwind CSS classes.
const colorMap: Record<ButtonColor, string> = {
    Default: 'bg-gray-500 hover:bg-gray-700 focus:ring-gray-300',
    Secondary: 'bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-300',
    Warning: 'bg-yellow-500 hover:bg-yellow-700 focus:ring-yellow-300',
    Information: 'bg-blue-500 hover:bg-blue-700 focus:ring-blue-300',
    Success: 'bg-green-500 hover:bg-green-700 focus:ring-green-300',
    Danger: 'bg-red-500 hover:bg-red-700 focus:ring-red-300',
};

const Button: React.FC<ButtonProps> = ({ label, icon, color = 'Default', onClick }) => {
    // Get the base color classes from the map, falling back to Default if a color is not provided.
    const buttonColorClasses = colorMap[color];

    return (
        <button
            className={`
                inline-flex items-center justify-center px-5 py-2 mr-2 
                border border-transparent rounded-2xl shadow-sm
                text-sm font-medium text-white
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${buttonColorClasses}
              `}
            onClick={onClick}>
            {icon && (<FontAwesomeIcon icon={icon} />)}
            {label}
        </button>
    );
};

export default Button;