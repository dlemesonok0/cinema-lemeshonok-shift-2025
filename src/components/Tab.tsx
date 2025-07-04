// import Link from 'next/link';
import React, {} from 'react';
import Image from 'next/image';

interface TabProps extends React.HTMLProps<HTMLDivElement> {
    iconSrc: string;
    iconAlt: string;
    iconWidth: number | `${number}`;
    iconHeight: number | `${number}`;
}

const Tab: React.FC<TabProps> = ({iconSrc, iconAlt, iconWidth, iconHeight, children, className = '', ...props}) => {
    return (
        <span className={className} {...props}>
            <Image src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
            {children}
        </span>
    );
}

export default Tab;