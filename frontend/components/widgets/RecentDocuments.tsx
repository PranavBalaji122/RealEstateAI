import React from 'react';
import { FileText, Download } from 'lucide-react';

export const RecentDocuments: React.FC = () => {
  const documents = [
    {
      name: 'Lease Agreement',
      property: '742 Evergreen',
      date: 'Nov 4, 2025',
      type: 'pdf'
    },
    {
      name: 'Tax Documents Q3',
      property: 'Portfolio',
      date: 'Nov 1, 2025',
      type: 'pdf'
    },
    {
      name: 'Insurance Policy',
      property: '1060 W Addison',
      date: 'Oct 28, 2025',
      type: 'pdf'
    },
    {
      name: 'Maintenance Receipt',
      property: '456 Oak Ave',
      date: 'Oct 25, 2025',
      type: 'pdf'
    }
  ];

  return (
    <div className="space-y-2">
      {documents.map((doc, idx) => (
        <div 
          key={idx}
          className="flex items-center gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded">
            <FileText size={16} className="text-[#FFB380]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate text-white">{doc.name}</p>
            <p className="text-xs text-[#A3A3A3]">{doc.property}</p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all">
            <Download size={14} className="text-[#A3A3A3]" />
          </button>
        </div>
      ))}
    </div>
  );
};
