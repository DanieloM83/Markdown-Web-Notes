import {FC} from "react";

interface ButtonProps {
	text?: string,
	callback?(): React.MouseEventHandler<HTMLDivElement>,
	disabled?: boolean,
};

const Button: FC<ButtonProps> = ({text = "", callback, disabled = false, ...props}) => {

	return (
		<div 
			onClick={disabled ? undefined : callback}
			role="button"
			aria-disabled={disabled}
			style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} 
			{...props} 
		>
			<p>{text}</p>
		</div>
	);
}

export default Button;
