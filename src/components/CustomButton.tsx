import React from 'react';

const CustomButton: React.FC<React.HTMLProps<HTMLDivElement>> = ({
                                                                     children,
                                                                     className = 'bg-primary w-[300px] px-8 py-4 rounded-2xl text-2xl font-semibold text-white cursor-pointer'
                                                                 }) => {
    return (
        <button className={className}>
            {children}
        </button>
    )
}

export default CustomButton;