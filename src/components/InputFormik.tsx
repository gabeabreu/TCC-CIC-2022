import { Field, useFormikContext } from 'formik';
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  autoFocus?: any;
  type?: string;
  name: string;
  label?: string;
  width?: number;
  placeholder?: string;
  disableErrorMessage?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  description?: string;
  mask?: string;
  descriptionMarginBottom?: number;
  textArea?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  autoComplete?: boolean;
  resize?: boolean;
}

const InputFormik: React.FC<Props> = ({
  required,
  autoFocus,
  name,
  label,
  placeholder,
  disableErrorMessage,
  secureTextEntry,
  description,
  descriptionMarginBottom,
  rows = 1,
  disabled,
  type,
  pattern,
  textArea,
  autoComplete,
  resize,
}) => {
  const { values, errors, touched, setFieldValue, setErrors } = useFormikContext<any>();
  const [focus, setFocus] = useState<boolean>(false);
  const [pressed, setPress] = useState<boolean>(false);

  const error = errors[name];
  const showError = touched[name] && !!error;

  const showContent = secureTextEntry && pressed;

  const inputRef = useRef<any>(null);

  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    if (autoFocus) onFocusHandler();
  }, []);

  return (
    <>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-300">*</span>}
        </label>
      )}
      <div className={`${error ? '' : 'pb-6'}`}>
        <Field
          className={`${!resize && 'resize-none'} ${
            disabled ? 'text-gray-500 bg-gray-100' : 'text-gray-600'
          } ${
            error ? 'border-red-300' : 'border-gray-300'
          } appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          name={name}
          error={!disableErrorMessage ? error : undefined}
          ref={inputRef}
          onFocus={() => {
            setFocus(true);
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
          }}
          autoComplete={autoComplete}
          type={type === 'currency' ? 'number' : type}
          disabled={disabled}
          onBlur={() => setFocus(false)}
          value={
            type === 'currency' ? values[name] && Number(values[name]).toFixed(2) : values[name]
          }
          placeholder={placeholder}
          pattern={pattern}
          rows={rows}
          as={textArea ? 'textarea' : 'input'}
        />

        {error || description ? (
          <div className="text-red-300 text-xs pb-2">{`${error || description || ''}`}</div>
        ) : null}
      </div>
    </>
  );
};

export default InputFormik;
