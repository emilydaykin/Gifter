const FormInput = ({ label, ...inputProps }) => {
  return (
    <div className='form__element'>
      <input className='form__input' {...inputProps} />
      {label && (
        <label
          htmlFor='displayName'
          className={`form__label ${inputProps.value.length ? '' : 'form__label--hide'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
