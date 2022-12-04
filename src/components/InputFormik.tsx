import { Field, useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

interface Props {
  autoFocus?: any;
  className?: string;
  withButton?: boolean;
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
  onSubmit?: (value?: any) => void;
}

const InputFormik: React.FC<Props> = ({
  required,
  className,
  withButton,
  autoFocus,
  name,
  label,
  placeholder,
  disableErrorMessage,
  secureTextEntry,
  description,
  rows = 1,
  disabled,
  type,
  pattern,
  textArea,
  autoComplete,
  resize,
  onSubmit = () => null,
}) => {
  const { t } = useTranslation();
  const { values, errors, touched, setFieldValue, setErrors } = useFormikContext<any>();
  const [focus, setFocus] = useState<boolean>(false);
  const [pressed, setPress] = useState<boolean>(false);

  const error = errors[name];
  const showError = touched[name] && !!error;

  const showContent = secureTextEntry && pressed;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-2 block text-lg font-medium text-mds-white">
          {label}
          {required && <span className="ml-1 text-mds-red">*</span>}
        </label>
      )}
      <div className={`${error ? '' : 'pb-6'} relative`}>
        <Field
          className={`${className} ${!resize && 'resize-none'} ${
            disabled ? 'text-gray-500 bg-gray-100' : 'text-mds-white'
          } ${
            error ? 'border-mds-red' : 'border-mds-gray-200'
          } bg-mds-gray-500 appearance-none block w-full px-3 py-[0.64rem] border rounded-md shadow-sm focus:shadow placeholder:text-mds-gray-200 outline-none focus:border-mds-purple sm:text-sm duration-500`}
          name={name}
          error={!disableErrorMessage ? error : undefined}
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
            type === 'currency'
              ? values[name] && Number(values[name]).toFixed(2)
              : values[name] || ''
          }
          placeholder={placeholder}
          pattern={pattern}
          rows={rows}
          as={textArea ? 'textarea' : 'input'}
        />
        {withButton && (
          <div className="absolute top-0 right-0">
            <Button
              onClick={() =>
                values[name]
                  ? onSubmit(values[name])
                  : required && setErrors({ ...errors, [name]: 'FORM_ERROR_REQUIRED' })
              }
              className="rounded-none rounded-r-md py-[0.45rem] button-gradient"
            >
              <span>Generate</span>
            </Button>
          </div>
        )}
        {error || description ? (
          <p className="text-mds-red pt-[0.5em] text-xs mb-[0.1rem]">{`${
            t(String(error)) || description || ''
          }`}</p>
        ) : null}
      </div>
    </div>
  );
};

export default InputFormik;
