import React from 'react';

export const Button = ({ children, ...props }) => (
  <button {...props} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
    {children}
  </button>
);

export const Input = ({ ...props }) => (
  <input {...props} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
);

export const Textarea = ({ ...props }) => (
  <textarea {...props} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
);

export const Label = ({ children, ...props }) => (
  <label {...props} className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
);

export const Select = ({ children, ...props }) => (
  <div {...props} className="relative">
    {children}
  </div>
);

export const SelectTrigger = ({ children }) => (
  <button className="w-full p-2 border rounded-md text-left focus:outline-none focus:ring-2 focus:ring-purple-500">
    {children}
  </button>
);

export const SelectContent = ({ children }) => (
  <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
    {children}
  </div>
);

export const SelectItem = ({ children, value, ...props }) => (
  <button
    {...props}
    value={value}
    className="w-full p-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
  >
    {children}
  </button>
);

export const SelectValue = ({ placeholder }) => (
  <span className="text-gray-500">{placeholder}</span>
);

// Tabs components
export const Tabs = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const TabsList = ({ children }) => (
  <div className="flex border-b">{children}</div>
);

export const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 ${isActive ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, isActive }) => (
  <div className={`mt-4 ${isActive ? 'block' : 'hidden'}`}>{children}</div>
);

// Card components
export const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div className={`px-4 py-3 border-b ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, ...props }) => (
  <div className={`p-4 border-t flex justify-evenly ${className}`} {...props} />
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-lg font-medium text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

export const Progress = ({ value, max }) => (
  <progress value={value} max={max} className="w-full h-2 rounded bg-gray-200">
    {value}%
  </progress>
);

// Alert components
export const Alert = ({ children, type = "info", ...props }) => {
  const typeStyles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div
      {...props}
      className={`p-4 border rounded-md ${typeStyles[type]} flex items-start`}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, ...props }) => (
  <h3 {...props} className="font-bold text-md mb-1">
    {children}
  </h3>
);

export const AlertDescription = ({ children, ...props }) => (
  <p {...props} className="text-sm">
    {children}
  </p>
);
// Table Components
export const Table = ({ children, className, ...props }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`} {...props}>
    {children}
  </table>
);

export const TableHeader = ({ children, className, ...props }) => (
  <thead className={`bg-gray-50 ${className}`} {...props}>
    {children}
  </thead>
);

export const TableHead = ({ children, className }) => (
  <th className={`px-4 py-2 text-left border-b ${className}`}>
    {children}
  </th>
);

export const TableBody = ({ children, className }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className }) => (
  <tr className={`hover:bg-gray-100 ${className}`}>
    {children}
  </tr>
);

export const TableCell = ({ children, className }) => (
  <td className={`px-4 py-2 border-b ${className}`}>
    {children}
  </td>
);

export const Badge = ({ variant = 'default', children, className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};