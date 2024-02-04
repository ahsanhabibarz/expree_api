const express = require("express");
var cron = require("node-cron");
var cors = require("cors");
const { default: axios } = require("axios");
var FormData = require("form-data");
var fs = require("fs");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 5000;

let request = 0;

function generateRandomWord(length) {
  const arr = [
    "shoe",
    "bag",
    "watch",
    "mouse",
    "phone",
    "bottle",
    "remote",
    "coke",
    "pepsi",
    "catfood",
    "jwellery",
    "ring",
    "green",
    "red",
    "blue",
    "white",
    "perfume",
    "door",
    "card",
    "sex",
  ];

  let randomRange = Math.floor(Math.random() * (arr.length - 1 - 1 + 1)) + 1;
  return (
    arr[randomRange] + " " + Math.floor(Math.random() * (999 - 111 + 1)) + 111
  );
}

cron.schedule("* * * * * *", async () => {
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream("./imagex.jpg"));
    let result = await axios({
      url: "https://chinaonlineapi.com/api/v1/get/product/by/image/search",
      method: "POST",
      data: form,
      headers: {
        "Content-Type": `multipart/form-data`,
        token:
          "gwkne73882b40gwgkef5150e91759f7a1282303230000000001utnhjglowjhmfl2585gfkiugmwp56092219",
      },
    });
    if (result) {
      console.log(result.data);
    }
    // let res2 = await axios.get(
    //   `https://sea-turtle-app-k8g8o.ondigitalocean.app/v1/most-search`,
    //   {
    //     headers: {
    //       token: "d5e73882b40c8aef5150e91759f7a128230323000000000156092219",
    //     },
    //   }
    // );
    // if (res2 && res2.data) {
    //   console.log(res2.data.length);
    // }
    // }

    // for (let index = 0; index < 9999999; index++) {
    //   axios.get(
    //     `https://hammerhead-app-93s9r.ondigitalocean.app/v1/most-search/cLSFPTrbVw5854619754jMrvkntAgW17684yPZBJ`,
    //     {
    //       headers: {
    //         token: "d5e73882b40c8aef5150e91759f7a128230323000000000156092219",
    //         phone: "01677066696",
    //         referer: "https://chinaonlinebd.com/",
    //       },
    //     }
    //   );
    //   console.log("--------------------------------");
    //   request = request + 1;
    //   console.log(request);
    //   console.log("--------------------------------");
    // }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, async () => {
  console.log("stated");
});
