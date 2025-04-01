import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const Separator = ({ className, orientation = 'horizontal', ...props }) => {
    return (
        <SeparatorPrimitive.Root
            className={`shrink-0 bg-gray-200 dark:bg-gray-800 ${
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
            } ${className || ''}`}
            orientation={orientation}
            {...props}
        />
    );
};

export { Separator };