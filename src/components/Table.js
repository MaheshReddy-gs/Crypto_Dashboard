import React from 'react';
import {
    Table as RadixTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@radix-ui/react-table';
import { cn } from '../lib/utils';

const Table = ({ className, children, ...props }) => {
    return (
        <RadixTable className={cn("", className)} {...props}>
            {children}
        </RadixTable>
    );
};

export { Table, TableHeader, TableBody, TableCell, TableHead, TableRow };