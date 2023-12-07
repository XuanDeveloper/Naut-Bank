import React, { useState } from "react";
import CampoTexto from "../campoTexto";
import Botao from "../Botao";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://192.168.1.117:6002/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Login bem-sucedido
        navigate("/home");
      } else {
        // Trate outros casos de resposta aqui
      }
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response && error.response.status === 401) {
        // Credenciais inválidas
        // Exibir mensagem para o usuário informando credenciais inválidas
        alert("Credenciais inválidas. Tente novamente.");
      } else {
        // Outro tipo de erro
        // Trate conforme necessário
        alert("Erro durante o login. Tente novamente mais tarde.");
      }
    }
    console.log(username, password);
  };

  return (
    <div className="loginForm">
      <h2>Entrar</h2>
      <CampoTexto
        className="CampoEmail"
        type="text"
        placeholder="Digite o seu E-mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CampoTexto
        className="CampoSenha"
        type="password"
        placeholder="Digite a sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/cadastro">Esqueceu sua senha</Link>
      <Botao funcao={handleSubmit} texto="Entrar" />
    </div>
  );
};

export default LoginForm;
