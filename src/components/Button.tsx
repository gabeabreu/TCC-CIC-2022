import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  children: ReactNode;
  isOutline?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button = ({
  className = '',
  children,
  isOutline = false,
  onClick = () => null,
  disabled = false,
  type = 'button',
}: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`${className} ${
      isOutline
        ? 'border-4 border-mds-white bg-transparent text-mds-white hover:bg-mds-white hover:text-mds-black'
        : 'bg-mds-black text-mds-white outline-none'
    } ${
      disabled ? 'opacity-30' : 'hover:bg-stk-white'
    } rounded-full px-8 py-2 text-lg duration-300`}
  >
    {children}
  </button>
);

export default Button;
