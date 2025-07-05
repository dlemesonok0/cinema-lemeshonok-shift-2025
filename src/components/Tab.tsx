// import Link from 'next/link';
import React, {} from 'react';

const Tab: React.FC<React.HTMLProps<HTMLDivElement>> = ({children, className = '', ...props}) => {
    return (
        <span className={className} {...props}>
            {children}
        </span>
    );
}

export default Tab;