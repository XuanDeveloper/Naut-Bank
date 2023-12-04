import { Link } from "react-router-dom";
import "./cadastroInfo.css"
const CadastroInfo = () => {
    return ( 
        <div className="cadastroInfo">
            <h1>Bem-vindo a bordo do Naut Bank!</h1>
            <h2>Insira suas credenciais para embarcar em sua jornada financeira.</h2>
            <p>Se você tem uma conta</p>
            <div className="login">
                <p>Você pode</p> 
                <a><Link to="/">Entre aqui!</Link></a>
            </div>
        </div>
     );
}
 
export default CadastroInfo;