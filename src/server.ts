import express from "express";
import cors from "cors";
import router from "./routes/index";

const app = express();

// const productRoutes = require("./routes/product.routes");
// app.use('/api', productRoutes );

app.use( cors() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );
app.use( express.json({ type: "application/vnd.api+json" }) );
app.use( router );

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`))