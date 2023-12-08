import React, { useState } from "react";
import CampoTexto from "../campoTexto";
import Botao from "../Botao";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'


const LoginForm = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://45.255.170.64:6002/login`, {
        nome,
        senha,
      });

      if (response.status === 200 && response.data.nome && response.data.saldo) {
        // Salvar informações do usuário no localStorage
        localStorage.setItem('userData', JSON.stringify({
          nome: response.data.nome,
          saldo: response.data.saldo
        }));

        console.log("Login bem-sucedido");
        navigate("/home");
      } else {
        console.log("Credenciais inválidas ou dados ausentes na resposta");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Swal.fire({
        icon: "error",
        title: "login invalido",
        text: "Algo deu errado!",
      });
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        Swal.fire({
          icon: "error",
          title: "Servidor fora do ar",
          text: "Algo deu errado!",
        });
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="loginForm">
      <h2>Entrar</h2>
      <CampoTexto
        className="CampoNome"
        type="text"
        placeholder="Digite o seu Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <CampoTexto
        className="CampoSenha"
        type="password"
        placeholder="Digite a sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <Link to="/cadastro">Esqueceu sua senha</Link>
      <Botao funcao={handleSubmit} texto="Entrar" />
    </div>
  );
};

export default LoginForm;
