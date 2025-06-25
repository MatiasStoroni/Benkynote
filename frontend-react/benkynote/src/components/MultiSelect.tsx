import React from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

// Opciones hardcodeadas de Ejemplo
// const options: Option[] = [
//   { label: 'nextjs', value: 'nextjs' },
//   { label: 'React', value: 'react' },
//   { label: 'Remix', value: 'remix' },
//   { label: 'Vite', value: 'vite' },
//   { label: 'Nuxt', value: 'nuxt' },
//   { label: 'Vue', value: 'vue' },
//   { label: 'Svelte', value: 'svelte' },
//   { label: 'Angular', value: 'angular' },
// { label: 'Ember', value: 'ember', disable: true },
// { label: 'Gatsby', value: 'gatsby', disable: true },
// ];

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = '',
}) => {
  return (
    <div className="w-full mt-1 border-indigo-300">
      <MultipleSelector
        defaultOptions={options}
        placeholder={placeholder}
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No se encontraron coincidencias.
          </p>
        }
      />
    </div>
  );
};

export default MultiSelect;
