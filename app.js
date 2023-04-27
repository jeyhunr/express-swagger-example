const express = require("express");
const app = express();
const router = express.Router();
const { createClient } = require("redis");

const client = createClient();
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

// redis router
router.get("/redis", (req, res) => {
  client
    .connect()
    .then((res) => {
      console.log("success", res);

      // set data with exp date
      client.setEx("key", 10, "Test").then((test) => {
        console.log("test", test);
      });
      // set data to redis
      client.set("myData", Date.now()).then((v) => {
        console.log("v1", v);
      });
      client.set("myData2", "This is a string").then((v2) => {
        console.log("v2", v2);
      });
      client
        .set("myData3", JSON.stringify({ id: 1, email: "mail@rahimli.net" }))
        .then((v3) => {
          console.log("v3", v3);
        });

      // get data from redis
      client.get("myData").then((r) => {
        console.log("r", r);
      });
      client.get("myData2").then((r2) => {
        console.log("r2", r2);
      });
      client.get("myData3").then((r3) => {
        console.log("r3", r3);
      });

      // remove data from db
      client.del("myData").then((d) => {
        console.log("d", d);
      });
      client.del(["myData2", "myDate3"]).then((d2) => {
        console.log("d2", d2);
      });

      res.json({ message: "success" });
    })
    .catch((err) => {
      console.log("error", err);
      res.json({ message: "failure" });
    });
});

// swagger router
router.use("/my-api-docs", swaggerUI.serve);
router.use("/my-api-docs", swaggerUI.setup(swaggerDocuent));

// listeb app
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
