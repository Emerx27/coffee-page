function Button({handleFunction, text, classes}) {
    return <button className={classes} onClick={handleFunction}>{text}</button>
}

export default Button;