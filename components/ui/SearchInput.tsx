'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit'> {
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  containerClassName?: string;
  showShortcutHint?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, onChange, onSubmit, showShortcutHint = false, ...props }, ref) => {
    const [value, setValue] = React.useState(
      (props.value as string) ?? (props.defaultValue as string) ?? ''
    );

    React.useEffect(() => {
      if (props.value !== undefined) {
        setValue(props.value as string);
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        e.preventDefault();
        onSubmit(value);
      }
      props.onKeyDown?.(e);
    };

    const handleClear = () => {
      setValue('');
      onChange?.('');
    };

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-10 py-2 text-sm shadow-sm transition-all placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
            className
          )}
          {...props}
        />
        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {/* Keyboard shortcut hint */}
        {showShortcutHint && !value && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-1 text-xs text-gray-400 sm:flex dark:text-gray-500">
            <kbd className="rounded border border-gray-300 bg-gray-50 px-1 font-sans dark:border-gray-600 dark:bg-gray-800">
              ⌘
            </kbd>
            <kbd className="rounded border border-gray-300 bg-gray-50 px-1 font-sans dark:border-gray-600 dark:bg-gray-800">
              K
            </kbd>
          </div>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
