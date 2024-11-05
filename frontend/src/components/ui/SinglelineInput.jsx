export const SinglelineInput = ({
  value,
  onChange,
  placeholder = "Enter your text here...",
  className = "bg-background border border-input p-1",
  ...rest
}) => {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};
