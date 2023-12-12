const Hapi = require('@hapi/hapi');

const users = ["Bejo", "Paijo", "Rudi"]
const foods = ["Soto", "Burger", "Nasi Goreng"]
const karyawan = {
    nama : "wiguna",
    jabatan : "senior manager",
    gaji : "9 digit"
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  //endpoint utama
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Halo, ini adalah API sederhana menggunakan Hapi.js';
    }
  });

  //endpoint get all data users
  server.route({
    method: 'GET',
    path: '/api/users',
    handler: (request, h) => {
      console.log(users)
      return { users };
    }
  });

  //endpoint post tambah data users
  server.route({
    method: 'POST',
    path: '/api/users',
    handler: (request, h) => {
      const { name, email } = request.payload;
      const newUser = { id: users.length + 1, name, email };
      users.push(newUser);
      return { message: 'Pengguna berhasil ditambahkan', user: newUser };
    }
  });

  //endpoint get all data makanan
  server.route({
    method: 'GET',
    path: '/api/foods',
    handler: (request, h) => {
      return { foods };
    }
  });

  //endpoint post tambah data makanan 
  server.route({
    method: 'POST',
    path: '/api/foods',
    handler: (request, h) => {
      const { name, type } = request.payload;
      const newFood = { id: foods.length + 1, name, type };
      foods.push(newFood);
      return { message: 'Makanan berhasil ditambahkan', food: newFood };
    }
  });


  try {
    await server.start();
    console.log('Server berjalan pada', server.info.uri);
  } catch (err) {
    console.log('Error saat menjalankan server:', err);
  }
};

init();
