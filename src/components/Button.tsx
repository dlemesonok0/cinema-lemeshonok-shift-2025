import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({
                    children,
                    className = '',
                    onClick,
                    ...props
                }: ButtonProps) => {
    const baseClasses = 'bg-primary w-[300px] px-8 py-4 rounded-2xl text-2xl font-semibold text-white cursor-pointer';

    return (
        <button
            {...props}
            onClick={onClick}
            className={`${baseClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;