import { Link } from "react-router-dom";
import "./cadastroInfo.css"
const CadastroInfo = () => {
    return ( 
        <div className="cadastroInfo">
            <div className="login">
                <p>Se você tem uma conta você pode</p> 
                <a><Link to="/">Entre aqui!</Link></a>
            </div>
        </div>
     );
}
 
export default CadastroInfo;