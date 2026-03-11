require('dotenv').config();
const app = require("./app");
const PORT= process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  }
);