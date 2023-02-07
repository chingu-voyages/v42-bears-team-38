import PropTypes from "prop-types";

/**
 * Primary UI component for user interaction
 */
const SelectInput = ({
  primary,
  backgroundColor,
  size,
  type,
  icon,
  value,
  onChange,
  label,
  options,
  ...props
}) => {
  const mode = primary
    ? "storybook-input--primary"
    : "storybook-input--secondary";
  const convertResult = (e) => {
    const value = e.target.value;
    if (value == "true") {
      onChange(true);
    } else if (value == "false") {
      onChange(false);
    } else if (!isNaN(value)) {
      onChange(Number(value));
    } else {
      onChange(value);
    }
  };
  return (
    <div>
      {label && <p className="storybook-input-label">{label}</p>}
      <div className="storybook-input-container">
        {icon && <div className="storybook-input-icon">{icon}</div>}
        <select
          type={type}
          className={["storybook-input", `storybook-input--${size}`, mode].join(
            " "
          )}
          style={backgroundColor && { backgroundColor }}
          onChange={convertResult}
          value={value}
          {...props}
        >
          <option>Select</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option == true && "Yes"}
              {option == false && "No"}
              {option != true && option != false && option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

SelectInput.defaultProps = {
  backgroundColor: null,
  primary: true,
  size: "medium",
  onClick: undefined,
  type: "text",
};
