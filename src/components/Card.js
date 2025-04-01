import React from 'react';
import { Card as RadixCard, CardContent, CardDescription, CardHeader, CardTitle } from '@radix-ui/react-card';
import { cn } from '../lib/utils';

const Card = ({ className, children, ...props }) => {
  return (
    <RadixCard className={cn("border shadow-sm", className)} {...props}>
      {children}
    </RadixCard>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };