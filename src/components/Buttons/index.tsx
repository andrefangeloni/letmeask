import { ButtonHTMLAttributes } from 'react';

import './style.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => (
  <button className="button" {...props} />
);
