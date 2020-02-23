import React from "react";
import UserSVG from "../utils/svg/User";
import PasswordSVG from "../utils/svg/Password";
import EmailSVG from "../utils/svg/Email";

interface InputLineInterface {
    icon?: string,
    placeholder?: string,
    type: string,
    name: string,
    classes?: string,
    value?: string
}

class InputLine extends React.Component<InputLineInterface> {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes = '', name= 'input', type = 'text', icon = '', placeholder = '', value = ''} = this.props;
        
        let svgElement;
        
        switch(icon) {
            case 'user':
                svgElement = <UserSVG/>;
                break;
            case 'email':
                svgElement = <EmailSVG/>;
                break;
            case 'password':
                svgElement = <PasswordSVG/>;
                break;
            default:
                svgElement = '';
                break;
        };
        
        return (
            <div className="o-input__line">
                {svgElement &&
                <div className="o-input__icon-container">
                    <div className="o-input__icon">
                        {svgElement}
                    </div>
                </div>}
                <input className={`o-input o-input--${icon} ${classes}`} type={type} name={name} placeholder={placeholder} value={value}/>
            </div>
        );
    }
}

export default InputLine;