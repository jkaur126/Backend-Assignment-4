import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`High-Risk Loan Application Monitoring API listening on port ${env.port}`);
});
