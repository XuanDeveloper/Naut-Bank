import React, { useState } from 'react';
import './home.css'; // Certifique-se de ter um arquivo CSS para estilizar a página

const Home = () => {
  const [user, setUser] = useState({
    username: 'John Doe',
    balance: 1000,
  });

  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const handleDeposit = (e) => {
    e.stopPropagation(); // Impede a propagação do evento para o elemento pai
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount)) {
      setUser({
        ...user,
        balance: user.balance + amount,
      });
      setDepositAmount('');
    }
  };

  const handleWithdraw = (e) => {
    e.stopPropagation(); // Impede a propagação do evento para o elemento pai
    const amount = parseFloat(withdrawAmount);
    if (!isNaN(amount) && amount <= user.balance) {
      setUser({
        ...user,
        balance: user.balance - amount,
      });
      setWithdrawAmount('');
    }
  };

  const handleTransfer = (e) => {
    e.stopPropagation(); // Impede a propagação do evento para o elemento pai
    const amount = parseFloat(transferAmount);
    if (!isNaN(amount) && amount <= user.balance) {
      setUser({
        ...user,
        balance: user.balance - amount,
      });
      setTransferAmount('');
      setTransferTo('');
    }
  };

  return (
    <div className="home-container">
      <div className="card">
        <h2>Informações da Conta</h2>
        <p>Usuário: {user.username}</p>
        <p>Saldo: R${user.balance.toFixed(2)}</p>
      </div>

      <div className="card">
        <div className="action-card" onClick={() => setShowDeposit(!showDeposit)}>
          <h3>Depósito</h3>
          {showDeposit && (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Digite o valor do depósito"
              />
              <button onClick={handleDeposit}>Depositar</button>
            </div>
          )}
        </div>

        <div className="action-card" onClick={() => setShowWithdraw(!showWithdraw)}>
          <h3>Saque</h3>
          {showWithdraw && (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Digite o valor do saque"
              />
              <button onClick={handleWithdraw}>Sacar</button>
            </div>
          )}
        </div>

        <div className="action-card" onClick={() => setShowTransfer(!showTransfer)}>
          <h3>Transferência</h3>
          {showTransfer && (
            <div onClick={(e) => e.stopPropagation()}>
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
              <button onClick={handleTransfer}>Transferir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
