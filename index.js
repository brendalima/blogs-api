const express = require('express');
const userRoute = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(userRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
