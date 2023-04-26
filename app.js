const express = require("express");
const app = express();
const router = express.Router();

// express configuration
app.use(express.json());
app.use(router);

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocuent = require("./swagger.json");
let data = [
  {
    id: 1,
    team: "Software Development",
  },
  {
    id: 2,
    team: "Frontend Team",
  },
  {
    id: 3,
    team: "Backend Team",
  },
  {
    id: 4,
    team: "FullStack Team",
  },
  {
    id: 5,
    team: "DevOps Team",
  },
  {
    id: 6,
    team: "Security Team",
  },
];

// routers
router.get("/get-data", (req, res) => {
  res.json(data);
});
router.post("/add-data", (req, res) => {
  const { team } = req.body;
  const newTeam = {
    id: data.length + 1,
    team: team,
  };
  data.push(newTeam);
  res.status(201).json(newTeam);
});
router.delete("/remove-data/:id", (req, res) => {
  const { id } = req.params;
  const newData = data.filter((item) => item.id != id);
  res.json(newData);
});

// swagger router
router.use("/my-api-docs", swaggerUI.serve);
router.use("/my-api-docs", swaggerUI.setup(swaggerDocuent));
// listeb app
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
