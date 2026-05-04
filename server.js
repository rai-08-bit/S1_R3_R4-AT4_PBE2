import 'dotenv/config';
import express from "express";
import routes from "./src/routes/routes.js";

const app = express();

app.use(express.json()); // estar sempre antes das rotas!!!
 app.use(express.urlencoded({extended:true}))
app.use('/', routes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`)
})