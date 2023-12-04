const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 6002;

const db = mysql.createConnection({
  host: '192.168.1.117',
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

// Rota de cadastr
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
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
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (error, results) => {
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
      } else if (results.length > 0) {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
          res.status(401).json({ error: 'Credenciais inválidas' });
        }
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
