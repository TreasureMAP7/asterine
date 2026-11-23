import express from "express";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth.route";
import orderRouter from "./routes/order.route";
import restaurantRouter from "./routes/restaurant.route";
import staffRouter from "./routes/staff.route";
import applicationRouter from "./routes/application.route";
import specs from "./config/swagger";

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/applications", applicationRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Welcome to MCSME App!!!");
});

app.listen(port, () => {
  console.log(`Open on http://localhost:${port}`);
});
