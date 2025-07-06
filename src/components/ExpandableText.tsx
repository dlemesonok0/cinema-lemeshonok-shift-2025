import React, {useState} from 'react';
import Movie from '@/types';

interface ExpandableTextProps {
    text: string;
    maxLength?: number;
    className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({text='', maxLength=150, className=''}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length < maxLength) {
        return <span className={className}>{text}</span>;
    }

    const truncatedText = text.slice(0, maxLength) + '...';

    return (
        <div className={className}>
            <span className='whitespace-pre-line'>
                {isExpanded ? text : truncatedText}
            </span>
            <button className={`${className} text-textSecondary ml-3`} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'свернуть' : 'раскрыть'}
            </button>
        </div>
    );
}

export default ExpandableText;