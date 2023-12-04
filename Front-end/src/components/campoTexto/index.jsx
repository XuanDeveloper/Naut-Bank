import "./campoTexto.css"

const CampoTexto = ({type, placeholder,className}) => {
    return ( 
        <div className="campoTexto">
            <input className={className} type={type} placeholder={placeholder}/>
        </div>
     );
}
 
export default CampoTexto;