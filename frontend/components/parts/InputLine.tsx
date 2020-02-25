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
    value?: string,
    handleOnChange?: Function,
    handleClick?: Function
}

class InputLine extends React.Component<InputLineInterface> {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes = '', name= 'input', type = 'text', icon = '', placeholder = '', value = '', handleOnChange = () => {}, handleClick = () => {}} = this.props;
        
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
                {type === "submit" 
                    ? <input className={`o-input o-input--${icon} ${classes}`} type={type} name={name} placeholder={placeholder} value={value} onClick={e => handleClick(e)}/>
                    : <input className={`o-input o-input--${icon} ${classes}`} type={type} name={name} placeholder={placeholder} onChange={e => handleOnChange(e)} onClick={e => handleClick(e)}/>
                }
            </div>
        );
    }
}

export default InputLine;