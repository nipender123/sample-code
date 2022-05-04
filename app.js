require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");

const port = 5000;
const cron = require("node-cron");
const axios = require("axios");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "500mb" }));
app.use("/uploads", express.static("uploads"));
const db = require("./models");
const { getImagesFromUrl } = require("./helpers/getImagesFromUrl");

db.sequelize.sync();
app.use("/users", require("./routes/user"));
app.use("/projects", require("./routes/project"));
app.use("/roles", require("./routes/role"));
app.use("/contacts", require("./routes/contact"));
app.use("/projectContacts", require("./routes/projectContact"));
app.use("/projectProposals", require("./routes/projectProposal"));
app.use("/acceptedTalents", require("./routes/acceptedTalents"));
app.use("/talents", require("./routes/talent"));
app.use("/comments", require("./routes/comment"));
app.use("/talentsMeta", require("./routes/talentsMeta"));
app.use("/followUps", require("./routes/followUp"));
app.use("/processImageLink", async (req, res) => {
  const { link } = req.body;
  const images = await getImagesFromUrl(link);
  return res.status(200).json(images);
});

// cron.schedule(
//   "00 10 13 * * *",
//   () => {
//     axios.get(`${process.env.API_URL}/acceptedTalents/send-report`);
//   },
//   {
//     scheduled: true,
//     timezone: "Europe/Berlin",
//   }
// );

cron.schedule(
  // every 15 min
  "0 */15 * * * *",
  () => {
    axios.get(`${process.env.API_URL}/projectProposals/processPdf`);
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);

// cron job for customized links to extract images

cron.schedule(
  // every 15 min
  "0 */15 * * * *",
  async () => {
    const config = {
      method: "get",
      url: axios.get(
        `${process.env.API_URL}/projectProposals/processCustomLink`
      ),
      headers: {},
    };

    await axios(config);
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);

// cron job for gettin talents tags from images

cron.schedule(
  // every 15 min
  "0 0 */1 * * *",
  async () => {
    const config = {
      method: "post",
      url: axios.post(`${process.env.API_URL}/talentsMeta/`),
      headers: {},
    };

    await axios(config);
  },
  {
    scheduled: true,
    timezone: "Europe/Berlin",
  }
);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Dbpscasting app listening on port ${port}!`);
});
