import React, { ReactNode } from 'react';
import { GripVertical, Maximize2, X } from 'lucide-react';

interface WidgetCardProps {
  title: string;
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  isDragging?: boolean;
  isDraggable?: boolean;
  isEditMode?: boolean;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ 
  title, 
  children, 
  onRemove,
  className = '',
  isDragging = false,
  isDraggable = false,
  isEditMode = false
}) => {
  return (
    <div 
      className={`relative bg-[#E8EAF6] rounded-3xl transition-all duration-300 h-full ${
        isDragging ? 'opacity-50' : ''
      } ${className} shadow-[12px_12px_24px_#C8CADE,-12px_-12px_24px_#FFFFFF] hover:shadow-[16px_16px_32px_#C8CADE,-16px_-16px_32px_#FFFFFF]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#D1D5E0]">
        <div className="flex items-center gap-2">
          <GripVertical 
            size={16} 
            className={`text-[#B4BBCC] cursor-move widget-drag-handle transition-all duration-300 ease-in-out ${
              isEditMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <h3 className="text-sm text-[#3E4C5E]">{title}</h3>
        </div>
        <div className={`flex items-center gap-1 transition-all duration-300 ease-in-out ${
          isEditMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}>
          <button className="p-1.5 rounded-lg bg-[#E8EAF6] text-[#8B94A8] hover:text-[#3E4C5E] transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]">
            <Maximize2 size={14} />
          </button>
          {onRemove && (
            <button 
              onClick={onRemove}
              className="p-1.5 rounded-lg bg-[#E8EAF6] text-[#FF6B7A] hover:text-[#FF4555] transition-all shadow-[3px_3px_6px_#C8CADE,-3px_-3px_6px_#FFFFFF] hover:shadow-[2px_2px_4px_#C8CADE,-2px_-2px_4px_#FFFFFF] active:shadow-[inset_2px_2px_4px_#C8CADE,inset_-2px_-2px_4px_#FFFFFF]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 overflow-auto h-[calc(100%-60px)]">
        {children}
      </div>
      
      {/* Resize handle - visual indicator */}
      <div 
        className={`absolute bottom-2 right-2 w-4 h-4 pointer-events-none transition-all duration-300 ease-in-out ${
          isEditMode ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="w-full h-full border-r-2 border-b-2 border-[#B4BBCC]"></div>
      </div>
    </div>
  );
};
