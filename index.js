const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(routes.userRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
