const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;

const app = express();
const port = 6002;

const db = mysql.createConnection({
  host: '45.225.170.64',
  user: 'root',
  password: 'euamogatos',
  database: 'naut_login',
  port: 6200
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
  }
});

app.use(express.json());

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  const { nome,email,cpf,senha,saldo} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    db.query(
      'INSERT INTO usuarios (nome,email,cpf,senha,saldo) VALUES (?,?,?,?,?)',
      [nome,email,cpf,hashedPassword,saldo],
      (error, results) => {
        if (error) {
          console.error('Erro ao cadastrar usuário:', error);
          res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        } else {
          res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        }
      }
    );
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    res.status(500).json({ error: 'Dados Já Cadastrados'});
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const results = await getUserFromDB(nome);

    if (results.length > 0) {
      const match = await bcrypt.compare(senha, results[0].senha);

      if (match) {
        const usuario = await obterNomeESaldoDoUsuario(results[0].id);

        res.status(200).json({
          message: 'Login bem-sucedido',
          nome: usuario.nome,
          saldo: usuario.saldo
        });

      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});





// Rota para realizar uma transação
app.post('/transacao', async (req, res) => {
  const { remetente, destinatario, valor } = req.body;

  console.log('Dados de entrada:', remetente, destinatario, valor);

  // Encontrar usuários com base no nome, CPF ou e-mail
  const remetenteUser = await findUser(remetente);
  const destinatarioUser = await findUser(destinatario);

  console.log('Remetente:', remetenteUser);
  console.log('Destinatário:', destinatarioUser);

  if (remetenteUser && destinatarioUser && valor > 0 && remetenteUser.saldo >= valor) {
    try {
      // Atualizar saldo do remetente
      await updateSaldo(remetenteUser.id, remetenteUser.saldo - valor);

      // Atualizar saldo do destinatário
      await updateSaldo(destinatarioUser.id, destinatarioUser.saldo + valor);

      console.log('Transação realizada com sucesso.');
      res.json({ message: 'Transação realizada com sucesso.' });
    } catch (error) {
      console.error('Erro ao realizar a transação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    console.log('Transação inválida');
    res.status(400).json({ error: 'Transação inválida.' });
  }
});

// Função para atualizar o saldo no banco de dados
async function updateSaldo(userId, newSaldo) {
  return db.promise().query('UPDATE usuarios SET saldo = ? WHERE id = ?', [Number(newSaldo), userId]);
}

// Função para encontrar usuário por nome, CPF ou e-mail
async function findUser(identifier) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM usuarios WHERE nome = ? OR cpf = ? OR email = ?',
      [identifier, identifier, identifier],
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
}



// Função para obter nome e saldo do usuário do banco de dados
async function obterNomeESaldoDoUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    db.query('SELECT nome, saldo FROM usuarios WHERE id = ?', [idUsuario], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const usuario = {
          nome: results[0].nome,
          saldo: results[0].saldo
        };
        resolve(usuario);
      }
    });
  });
}

async function getUserFromDB(nome) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE nome = ?', [nome], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}








app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



