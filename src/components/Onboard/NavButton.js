const NavButton = (props) => {
    return (
        <button onClick={props.callBack} className={`mt-4 pl-4 pr-4 pt-2 pb-2 bg-white ${props.className}`}>{props.buttonText}</button>
    )
}

export default NavButton;