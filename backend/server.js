import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import contactsRoute from "./routes/contactsRoute.js";
import companiesRoute from "./routes/companiesRoute.js";
import ticketsRoute from "./routes/ticketsRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRoute);
app.use("/api/companies", companiesRoute);
app.use("/api/tickets", ticketsRoute);

app.listen(3000, () => {
  console.log(`Server is running`);
});
