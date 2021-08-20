import { Field, useField } from 'formik';
import { lowerCase, upperFirst } from 'lodash';
import React, { useMemo } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { StyledInputWrapper } from '../../styles';

type Option = string | number | object;

type Property<T> = T extends string ? undefined : T extends number ? undefined : keyof T;

interface SelectProps<T> {
  valueProp: Property<T>;
  displayProp: Property<T>;
}

type Optional<T> = Property<T> extends undefined ? Partial<SelectProps<T>> : Required<SelectProps<T>>;

type Props<T> = {
  name: string;
  label?: string;
  options: T[];
  className?: string;
  required?: boolean;
  hideError?: boolean;
  placeholder?: string;
} & Optional<T>;

export const SelectInput = function <T extends Option>({
  name,
  label,
  options,
  displayProp,
  valueProp,
  placeholder,
  hideError,
  className,
  ...props
}: Props<T>) {
  const [field, meta] = useField({ name });

  const arrayOfValidOptions = useMemo(() => {
    return options.map((opt) => opt[valueProp as unknown as keyof T] ?? opt);
  }, [options, valueProp]);

  const optionElements: React.ReactNode = useMemo(() => {
    return options.map((opt, i) => {
      const display = opt[displayProp as unknown as keyof T] ?? opt;
      const value = opt[valueProp as unknown as keyof T] ?? opt;

      return (
        <option key={i} value={value as any}>
          {display}
        </option>
      );
    });
  }, [valueProp, displayProp, options]);

  return (
    <StyledInputWrapper className={`${meta.error && meta.touched ? 'error ' : ''}${className || ''}`}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="body">
        <Field
          className={`input ${!arrayOfValidOptions.includes(meta.value) && 'as-placeholder'}`}
          as="select"
          {...props}
          {...field}
          value={field.value ?? ''}
        >
          {placeholder && (
            <option
              value={
                arrayOfValidOptions.includes(meta.initialValue) ?
                  'AN_INVALID_FIELD_PLACEHOLDER' :
                  meta.initialValue ?? ''
              }
              disabled
            >
              {placeholder}
            </option>
          )}
          {optionElements}
        </Field>
        <span className="dropdown-icon absolute right-0 top-0 bottom-0 px-2 centered">
          <FiChevronDown size={18} />
        </span>
      </div>
      {meta.error && meta.touched && !hideError && (
        <span className="error__message">{upperFirst(lowerCase(meta.error))}</span>
      )}
    </StyledInputWrapper>
  );
};
