const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
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
app.post('/signup', async (req, res) => {
  const { nome,email,cpf,senha} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    db.query(
      'INSERT INTO usuarios (nome,email,cpf,senha) VALUES (?,?,?,?)',
      [nome,email,cpf,hashedPassword],
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
    res.status(500).json({ error: 'Erro interno' });
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
        res.status(200).json({ message: 'Login bem-sucedido' });
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

// Função para obter usuário do banco de dados
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
