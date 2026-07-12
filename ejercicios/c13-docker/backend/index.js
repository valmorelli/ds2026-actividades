import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend de la Libreria UTN funcionando en Docker');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});