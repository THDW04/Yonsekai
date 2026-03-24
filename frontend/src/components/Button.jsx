export const Button = ({text, icon}) =>{
    return(
        <button>
            <span>{text}</span>
            <span><img src={icon} alt="" /></span>
        </button>
    )
}