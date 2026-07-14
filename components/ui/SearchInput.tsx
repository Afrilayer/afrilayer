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
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/50" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-10 w-full rounded-lg border border-sand-100 bg-white pl-9 pr-10 py-2 text-sm shadow-subtle transition-all placeholder:text-charcoal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-baobab-600 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-charcoal/50 hover:bg-sand-100"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {/* Keyboard shortcut hint */}
        {showShortcutHint && !value && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-1 text-xs text-charcoal/50 sm:flex">
            <kbd className="rounded border border-sand-100 bg-sand-50 px-1 font-sans">
              ⌘
            </kbd>
            <kbd className="rounded border border-sand-100 bg-sand-50 px-1 font-sans">
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
