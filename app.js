const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'db_coba'
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
    return;
  }
  console.log('Koneksi ke database berhasil');
});

// const users = ["Bejo", "Paijo", "Rudi"];
// const foods = ["Soto", "Burger", "Nasi Goreng"];

// const karyawan = {
//     nama: "wiguna",
//     jabatan: "senior manager",
//     gaji: "9 digit"
// };

// Endpoint for root
app.get('/', (req, res) => {
    res.send('Halaman utama');
});

// Endpoint to get all users
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error saat mengambil data pengguna: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
      return;
    }
    res.send({ users: results });
  });
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {
      console.error('Error saat mengambil data pengguna: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
      return;
    }
    // res.json(`hasil ${id}`)
    res.json({results})
  });
});


app.get('/api/users/search', (req, res) => {
  console.log("Mencari id :", req.query.id)

  connection.query( `SELECT * FROM users WHERE id = ${req.query.id}`, (error, results) => {
    if (error) {
      console.error('Error saat mengambil data pengguna: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
      return;
    }
    res.json({ users: results });
  });
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.json({ message: 'Pengguna berhasil ditambahkan', user: newUser });
});

// Endpoint to get all foods
app.get('/api/food', (req, res) => {
  connection.query('SELECT * FROM food', (error, results) => {
    if (error) {
      console.error('Error saat mengambil data pengguna: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
      return;
    }
    res.json({ users: results });
  });
});

// Endpoint to add a new food
app.post('/api/foods', (req, res) => {
    const { name, type } = req.body;
    const newFood = { id: foods.length + 1, name, type };
    foods.push(newFood);
    res.json({ message: 'Makanan berhasil ditambahkan', food: newFood });
});

app.get('/api/restaurants', (req, res) => {
  connection.query('SELECT * FROM restaurants', (error, results) => {
    if (error) {
      console.error('Error saat mengambil data pengguna: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
      return;
    }
    res.json({ users: results });
  });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
