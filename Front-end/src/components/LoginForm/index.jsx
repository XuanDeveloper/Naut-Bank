import CampoTexto from "../campoTexto"
import Botao from "../Botao"
import RedesSocial from "../redesSocial"
import "./loginForm.css"
import { Link, useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
        
    }
    return ( 
        <div className="loginForm">
            <h2>Entrar</h2>
            <CampoTexto className="CampoEmail" type="text" placeholder="Digite o seu E-mail"/>
            <CampoTexto className="CampoSenha" type="password" placeholder="Digite a sua senha"/>
            <a><Link to="/cadastro">Esqueceu sua senha</Link></a>
            <Botao funcao={handleSubmit} texto="Entrar"/>
           
            
        </div>
     );
}
 
export default LoginForm;