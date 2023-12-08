import React, { useState } from "react";
import CampoTexto from "../campoTexto";
import Botao from "../Botao";
import RedesSocial from "../redesSocial";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./cadastroForm.css";


const CadastroForm = () => {
  const navigate = useNavigate();

  // State variables to store user input
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleRegister = async () => {
    // Check if passwords match
    if (senha !== confirmaSenha) {
      console.log("As senhas não coincidem.");
      return;
    }

    try {
      // Make a registration API request
      const response = await axios.post(`http://45.255.170.64:6002/cadastro`, {
        email,
        nome,
        cpf,
        senha,
        saldo: 0, // You may set an initial balance if needed
      });

      if (response.status === 201) {
        console.log("Usuário cadastrado com sucesso");
        // Redirect to the home page after successful registration
        navigate("/");
      } else {
        console.log("Erro no cadastro:", response.data.error);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="cadastroForm">
      <h2>Cadastra-se</h2>
      <CampoTexto
        className="CampoTexto"
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CampoTexto
        className="CampoTexto"
        type="text"
        placeholder="Nome e Sobrenome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <CampoTexto
        className="CampoTexto"
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCPF(e.target.value)}
      />
      <CampoTexto
        className="CampoTexto"
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <CampoTexto
        className="CampoTexto"
        type="password"
        placeholder="Confirme a Senha"
        value={confirmaSenha}
        onChange={(e) => setConfirmaSenha(e.target.value)}
      />
      <Botao funcao={handleRegister} texto="Registrar" />
    </div>
  );
};

export default CadastroForm;
