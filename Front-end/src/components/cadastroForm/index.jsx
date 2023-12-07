import CampoTexto from "../campoTexto"
import Botao from "../Botao"
import RedesSocial from "../redesSocial"
import { useNavigate } from "react-router-dom"
import "./cadastroForm.css"

const CadastroForm = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return ( 
        <div className="CardC">
            <div className="cadastroForm">
                <h2>Cadastra-se</h2>
                <CampoTexto className="CampoTexto" type="text" placeholder="E-mail"/>
                <CampoTexto className="CampoTexto" type="text" placeholder="nome e sobrenome"/>
                <CampoTexto className="CampoTexto" type="text" placeholder="CPF"/>
                <CampoTexto className="CampoTexto" type="text" placeholder="senha"/>
                <CampoTexto className="CampoTexto" type="text" placeholder="Confirme a senha"/>
                <Botao funcao={handleClick} texto="Registrar"/>
           
            </div>
        </div>
     );
}
 
export default CadastroForm;