import express from "express";
import { AppDataSource } from "./data-source";
import helloRoutes from "./routes/helloRoutes";
import router from "./routes/routes";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use("/api/hello", helloRoutes);

    app.use("/api", router);

    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
  })
  .catch((error) => console.log(error));
