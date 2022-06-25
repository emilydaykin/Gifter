const FormInput = ({ label, ...inputProps }) => {
  return (
    <div className='form__input'>
      <label htmlFor='displayName'>{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default FormInput;
