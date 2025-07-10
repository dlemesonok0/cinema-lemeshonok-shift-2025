import React from 'react';

const ProgressBar = ({width, percent, className = ''}: {
    width: number,
    percent: number,
    className?: string | undefined,
}) => {
    if (percent > 1 || percent < 0) {
        throw new Error('Процент в ProgressBar должен быть в пределах 0-1')
    }

    return (
        <div style={{ width: width }} className={`${className} rounded-sm relative bg-indicatorLight h-1 overflow-hidden`}>
            <div style={{ width: `${percent * 100}%` }} className={`absolute top-0 left-0 h-1 bg-indicatorPositive`}></div>
        </div>
    )
}

export default ProgressBar;