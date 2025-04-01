import React, { forwardRef } from 'react';

const Button = forwardRef(
    ({ className, variant = 'default', ...props }, ref) => {
        const getClassNames = () => {
            let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
            
            // Add variant-specific classes
            if (variant === "outline") {
                baseClasses += " border border-input bg-background hover:bg-accent hover:text-accent-foreground";
            } else if (variant === "secondary") {
                baseClasses += " bg-secondary text-secondary-foreground hover:bg-secondary/80";
            } else if (variant === "ghost") {
                baseClasses += " hover:bg-accent hover:text-accent-foreground";
            } else if (variant === "link") {
                baseClasses += " text-primary underline-offset-4 hover:underline";
            } else if (variant === "default") {
                baseClasses += " bg-primary text-primary-foreground hover:bg-primary/80";
            }
            
            // Add custom classes
            if (className) {
                baseClasses += " " + className;
            }
            
            return baseClasses;
        };

        return (
            <button
                ref={ref}
                className={getClassNames()}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button }; 