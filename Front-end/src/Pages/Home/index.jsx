import CampoTexto from "../../components/campoTexto"
import Botao from "../../components/Botao"
import "./home.css"
import React, { useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('John Doe');
  const [balance, setBalance] = useState(1000);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount)) {
      setBalance(balance + amount);
      setDepositAmount('');
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount <= balance) {
      setBalance(balance - amount);
      setWithdrawAmount('');
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (!isNaN(amount) && amount <= balance) {
      setBalance(balance - amount);
      setTransferAmount('');
      setTransferTo('');
    }
  };

  return (
    <div>
      <h2>Informações da Conta</h2>
      <p>Usuário: {username}</p>
      <p>Saldo: R${balance.toFixed(2)}</p>

      <h3>Depósito</h3>
      <input
        type="text"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        placeholder="Digite o valor do depósito"
      />
      <Botao texto='Depositar' funcao={handleDeposit}/>

      <h3>Saque</h3>
      <input
        type="text"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        placeholder="Digite o valor do saque"
      />
      <Botao texto='Sacar' funcao={handleWithdraw}/>

      <h3>Transferência</h3>
      <input
        type="text"
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        placeholder="Digite o valor da transferência"
      />
      <input
        type="text"
        value={transferTo}
        onChange={(e) => setTransferTo(e.target.value)}
        placeholder="Digite o usuário do destinatário"
      />
      <Botao texto='Transferir' funcao={handleTransfer}/>
    </div>
  );
};

export default Home;
