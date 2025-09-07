import React from 'react'
import { convertISOToThaiDateTime } from '@/utils/convertISOToThaiDateTime';

export type Column = {
    key: string;
    label: string;
};

export interface Rows {
    _id: string;
    action: 'reserve' | 'cancel';
    userId: string;
    username: string;
    concert: {
        _id: string;
        name: string;
        totalOfSeat: number;
        description: string;
        createdAt: string; 
        updatedAt: string;
        __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TableComponentProps {
    rows: Rows[];
    columns: readonly Column[];
    loading?: boolean;
}

const TableComponent = ({ rows = [], columns }: TableComponentProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-500 rounded-lg bg-white">
                <thead className="bg-white">
                    <tr>
                        {columns.map((column) => <th key={column.key} className="px-4 py-2 text-left font-semibold border-b border-r border-gray-500 ">{column.label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="text-sm md:text-md px-4 py-2 border-b border-r border-gray-500">{convertISOToThaiDateTime(row.createdAt)}</td>
                                <td className="text-sm md:text-md px-4 py-2 border-b border-r border-gray-500">{row.username}</td>
                                <td className="text-sm md:text-md px-4 py-2 border-b border-r border-gray-500">{row.concert?.name}</td>
                                <td className="text-sm md:text-md px-4 py-2 border-b border-r border-gray-500">{row.action}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center text-gray-500 py-4">
                                Not found data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent