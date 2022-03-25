import express from "express";
import cors from "cors";
import router from "./routes/index";
import userIndication from "./routes/user.routes";

const app = express();

// const productRoutes = require("./routes/product.routes");
// app.use('/api', productRoutes );

app.use( cors() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( express.json({ type: "application/vnd.api+json" }) );
app.use( router );
app.use( userIndication );

import { getUserById } from "./controller/service/activecampaign";

app.get('/test/:id', async (req, res) => {
    let response = await getUserById(parseInt(req.params.id));

    res.status(response['status']).send(response['data']);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))