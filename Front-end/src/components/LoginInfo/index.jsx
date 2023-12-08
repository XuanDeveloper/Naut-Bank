import "./loginInfo.css";
import { useNavigate } from "react-router-dom";

const LoginInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="loginInfo">
      <h1>Bem-vindo a bordo do Naut Bank!</h1>
      <h2>Insira suas credenciais para embarcar em sua jornada financeira.</h2>
      <p>Se você não tem uma conta cadastre-se</p>
      <div className="register">
        <p>Você pode se</p> 
        <a className="link-login" onClick={() => navigate("/cadastro")}>registrar aqui!</a>
      </div>
    </div>
  );
}

export default LoginInfo;
