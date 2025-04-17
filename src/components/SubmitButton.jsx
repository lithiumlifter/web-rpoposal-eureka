const SubmitButton = ({ label = "Simpan", className = "", ...props }) => {
    return (
      <button type="submit" className={`btn btn-primary ${className}`} {...props}>
        {label}
      </button>
    );
  };
  
  export default SubmitButton;
  