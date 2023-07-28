import "./Button.scss";

/* 
 * Button Component
 * - Represents a button element with an icon and text
 *
 * Props:
 * 'variant' prop: determines the visual style variant of the button (Options: primary, secondary, delete)
 * 'type' prop: determines the type of the button element
 * 'text' prop: should be a string that is the text within the button
 */

function Button({ variant, type, text }) {
    return (
        <button className={`button button__${variant}`} type={type} >
            {text}
        </button>
    );
};

export default Button;