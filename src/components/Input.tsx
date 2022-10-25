interface Props {
  name?: string;
  label?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const Input = ({
  name,
  label,
  type = 'text',
  value = undefined,
  defaultValue,
  placeholder = '',
  className = '',
  disabled = false,
  required = false,
  icon,
  onChange,
}: Props) => {
  return (
    <div
      className={`${
        disabled ? 'opacity-40' : 'opacity-100'
      }  flex flex-col relative justify-center`}
    >
      {/* {label && (
        <span className="mb-2 truncate  text-sm font-medium text-stk-grey-400">
          {(validation?.required || dynamicRequired) && (
            <span
              className={`${
                error || (!value && dynamicRequired) ? 'text-stk-red' : 'text-stk-green'
              } mr-1 duration-500`}
            >
              *
            </span>
          )}
          {label}
        </span>
      )} */}
      {icon ? <div className="absolute text-base ml-5">{icon}</div> : null}
      <input
        defaultValue={defaultValue}
        value={value}
        maxLength={99}
        placeholder={placeholder}
        type={type}
        className={`${className} ${
          disabled ? 'bg-stk-blue-400 text-stk-grey-300' : 'bg-transparent text-stk-white'
        } ${
          icon ? 'pl-12' : ''
        } w-full border px-[0.9rem] py-2 outline-none duration-500 placeholder:text-stk-grey-600`}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
