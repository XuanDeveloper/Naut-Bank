import React, { useState, useEffect } from 'react';
import CampoTexto from "../../components/campoTexto";
import Botao from "../../components/Botao";
import "./home.css";
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');

  useEffect(() => {
    // Recupera informações do usuário do localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      setUsername(userData.nome);
      setBalance(userData.saldo);
    }
  }, []);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount)) {
      setBalance(prevBalance => prevBalance + amount);
      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
      setWithdrawAmount('');
    }
  };

  const handleTransfer = async () => {
    const amount = parseFloat(transferAmount);
    const targetUser = transferTo.trim();

    if (!isNaN(amount) && amount <= balance && targetUser) {
      try {
        // Realiza a chamada para a API de transferência
        const response = await axios.post('http://192.168.1.117:6002/transferir', {
          origem: username,
          destino: targetUser,
          valor: amount,
        });

        if (response.status === 200) {
          // Atualiza o saldo localmente após a transferência bem-sucedida
          setBalance(prevBalance => prevBalance - amount);
          setTransferAmount('');
          setTransferTo('');
          console.log('Transferência bem-sucedida');
        } else {
          console.log('Erro na transferência:', response.data.error);
        }
      } catch (error) {
        console.error('Erro ao realizar transferência:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="account-info">
        <h2>Informações da Conta</h2>
        <p>Usuário: {username}</p>
        <p>Saldo: R${typeof balance === 'number' ? balance.toFixed(2) : balance}</p>
      </div>
      
      <div className="transfer-section">
        <h3>Transferência</h3>
        <CampoTexto
          type="text"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Digite o valor da transferência"
        />
        <CampoTexto
          type="text"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
          placeholder="Digite o CPF/email do destinatário"
        />
        <Botao texto='Transferir' funcao={handleTransfer}/>
      </div>
    </div>
  );
};

export default Home;
