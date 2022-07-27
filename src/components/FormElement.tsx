import { FC, InputHTMLAttributes } from 'react';

type FormElementProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormElement: FC<FormElementProps> = ({ label, ...inputProps }) => {
  return (
    <div className='form__element'>
      <input className='form__input' {...inputProps} />
      {label && (
        <label htmlFor={inputProps.id} className='form__label'>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormElement;
