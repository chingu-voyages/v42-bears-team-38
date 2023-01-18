import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

/**
 * Primary UI component for user interaction
 */
export const Input = ({
	primary,
	backgroundColor,
	size,
	type,
	icon,
	value,
	onChange,
	label,
	...props
}) => {
	const mode = primary
		? 'storybook-input--primary'
		: 'storybook-input--secondary';
	return (
		<div>
			{label && <p className='storybook-input-label'>{label}</p>}
			<div className='storybook-input-container'>
				{icon && <div className='storybook-input-icon'>{icon}</div>}
				<input
					type={type}
					className={['storybook-input', `storybook-input--${size}`, mode].join(
						' '
					)}
					style={backgroundColor && { backgroundColor }}
					onChange={e => onChange(e.target.value)}
					value={value}
					{...props}
				></input>
			</div>
		</div>
	);
};

Input.propTypes = {
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
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/**
	 * Button contents
	 */
	label: PropTypes.string,
	/**
	 * Optional click handler
	 */
	onClick: PropTypes.func,
};

Input.defaultProps = {
	backgroundColor: null,
	primary: true,
	size: 'medium',
	onClick: undefined,
	type: 'text',
};
