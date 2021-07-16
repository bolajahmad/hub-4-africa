// global text input, used everywhere
// must be placed inside a formik component wrapper
// styles available in '../../styles/styled/StyledInputWrapper.tsx'

import { Field, useField } from 'formik';
import { motion } from 'framer-motion';
import { lowerCase, upperFirst } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { StyledInputWrapper } from '../../styles';
import {
  AnimateInputVariants,
  compileClass,
  useWindowDimensions,
} from '../../utils';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
  label?: React.ReactText | React.ReactNode;
  as?: 'textarea';
  setValue?: (field: string, value: string) => void;
  required?: boolean;
  white?: boolean;
  hideIcons?: boolean;
  hideError?: boolean;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  type,
  className,
  as,
  white,
  required,
  children,
  hideIcons,
  setValue,
  placeholder,
  hideError,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const [field, meta] = useField({ name });
  const [computedType, setComputedType] = useState(type);

  const toggleVisibility = useCallback(() => {
    setComputedType((type) => (type === 'password' ? 'text' : 'password'));
  }, [setComputedType]);

  const passwordVisible = useMemo(
    () => computedType === 'text',
    [computedType]
  );

  const showError = meta.error && meta.touched;
  const variant = useMemo(() => (showError ? 'error' : 'initial'), [showError]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      type === 'tel' &&
      /[+\D]/.test(e.key) &&
      e.key.charCodeAt(0) !== 43 &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      !e.key.includes('Arrow')
    ) {
      e.preventDefault();
    }

    if (
      type === 'number' &&
      ['e', 'E', '+', '-'].includes(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete'
    ) {
      e.preventDefault();
    }
  };

  return (
    <StyledInputWrapper white={white} width={width} className={className}>
      {label && (
        <label className="label" htmlFor={name}>
          {required && <span className="dot">*</span>}
          {label}
        </label>
      )}
      <motion.div
        variants={AnimateInputVariants}
        animate={variant}
        transition={{ duration: 0.2 }}
        className={compileClass('body', showError && 'error')}
      >
        <Field
          className="input"
          onKeyDown={handleKeyDown}
          type={computedType}
          {...props}
          {...field}
          placeholder={placeholder}
          as={as}
        >
          {children}
        </Field>
        {type === 'password' && (
          <button
            type="button"
            className="switch-button"
            onClick={toggleVisibility}
          >
            {passwordVisible ? (
              <FiEyeOff size={15} className="switch-icon" />
            ) : (
              <FiEye size={15} className="switch-icon" />
            )}
          </button>
        )}
      </motion.div>
      {meta.error && meta.touched && !hideError && (
        <span className="error-message">
          {upperFirst(lowerCase(meta.error))}
        </span>
      )}
    </StyledInputWrapper>
  );
};
