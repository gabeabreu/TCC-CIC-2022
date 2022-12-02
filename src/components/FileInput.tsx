import { useFormikContext } from 'formik';
import React, { useState } from 'react';

interface Props {
  autoFocus?: any;
  className?: string;
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

const FileInput = ({
  required,
  className,
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
}: Props) => {
  const { values, errors, touched, setErrors } = useFormikContext<any>();
  const [focus, setFocus] = useState<boolean>(false);
  const [pressed, setPress] = useState<boolean>(false);

  const error = errors[name];
  const showError = touched[name] && !!error;

  const showContent = secureTextEntry && pressed;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 block text-lg font-medium text-mds-white">
          {label}
          {required && <span className="ml-1 text-mds-red">*</span>}
        </label>
      )}
      <div
        className={`${className} py-20 flex flex-col items-center w-full rounded-md border-2 border-dashed bg-mds-gray-500 border-mds-gray-200`}
      >
        <svg
          width="34"
          height="36"
          viewBox="0 0 34 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.6663 24.6667C7.02466 24.6685 5.44006 24.0646 4.21608 22.9705C2.99211 21.8765 2.21483 20.3693 2.03315 18.7378C1.85148 17.1062 2.27819 15.465 3.23153 14.1285C4.18487 12.7921 5.5978 11.8543 7.19964 11.495C6.73617 9.33349 7.15034 7.07639 8.35105 5.22025C9.55175 3.36411 11.4406 2.06097 13.6021 1.5975C15.7637 1.13404 18.0207 1.54821 19.8769 2.74892C21.733 3.94962 23.0362 5.83849 23.4996 8H23.6663C25.7329 7.99793 27.7265 8.76381 29.2602 10.149C30.7939 11.5341 31.7581 13.4397 31.9658 15.4958C32.1735 17.552 31.6098 19.6119 30.3841 21.2758C29.1584 22.9397 27.3582 24.0888 25.333 24.5M21.9996 19.6667L16.9996 14.6667M16.9996 14.6667L11.9996 19.6667M16.9996 14.6667V34.6667"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div className="flex mt-2 text-sm">
          <label
            htmlFor={`fileupload` + name}
            className="relative cursor-pointer rounded-md font-medium text-mds-white outline-none hover:text-mds-purple duration-300"
          >
            <span>Click to upload</span>
            <input
              id={`fileupload` + name}
              name={name}
              type="file"
              className="sr-only"
              onClick={() => {
                setFocus(true);
                const newErrors = { ...errors };
                delete newErrors[name];
                setErrors(newErrors);
              }}
            />
          </label>
          <p className="pl-1 text-mds-gray-100">or drag and drop</p>
        </div>
        <p className="mt-1 text-xs text-mds-gray-200">SVG, PNG, JPG or GIF (MAX. 620x500px)</p>
      </div>
    </div>
  );
};

export default FileInput;
