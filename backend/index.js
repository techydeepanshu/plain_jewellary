const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const axios = require("axios");
const pool = require("./db");
const fs = require("fs");
const { red } = require("@mui/material/colors");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let all;
let metal_price;

let mj_sell_rate;
let newcode;
let troyounce_gold;
let fine_troy_ounce;
let gross_weight;
let fineness;
let fine_weight;

const rouundoff = (value) => {
  var return_value = Math.round((value + Number.EPSILON) * 100) / 100;
  return return_value;
};

const getall_data = async () => {
  try {
    console.log("all data req send...");
    const alldata = await pool.query(
      "SELECT * FROM public.new_combination_test"
    );
    all = alldata.rows;
    console.log("all", "set running");
  } catch (error) {
    console.log(error, "error");
  }
};

app.get("/all", cors(), async (req, res) => {
  try {
    const alldata = await pool.query(
      "SELECT * FROM public.new_combination_test"
    );
    res.json(alldata);
    all = alldata.rows;
    console.log("ALL DATA API");
  } catch (error) {
    console.log(error, "error");
  }
});



app.get("/dropdown", (req, res) => {
  pool.query(
    "SELECT * FROM dropdown"
  ).then((response) => {
    console.log("response : ", response)
    let dataresp = response.rows
    res.json(dataresp)
  })
})

app.get("/plainstock", (req, res) => {
  pool.query(
    "SELECT * FROM plain_stock"
  ).then((response) => {
    console.log("response : ", response)
    let dataresp = response.rows
    res.json(dataresp)
  })
})


app.get("/createclientdata", (req, res) => {
  pool.query(
    `CREATE TABLE clientData
    (
        id   serial PRIMARY KEY,
        title varchar(50),
        client_id varchar(50),
        first_name varchar(50),
        surname varchar(50),
        house_name varchar(50),
        address_l2 varchar(50),
        city_and_town varchar(50),
        postcode varchar(50),
        telephone varchar(50),
        mobile varchar(50),
        email varchar(50),
        relation_OD varchar(50),
        name_OD varchar(50),
        surname_OD varchar(50),
        comments_OD varchar(50),
        email_OD varchar(50),
        mobile_OD varchar(50),
        consent varchar(50),
        
    )`
  ).then((response) => {
    console.log("response : ", response)
    let dataresp = response.rows
    res.json(dataresp)
  })
})


app.post("/insertclientdata", (req, res) => {
  console.log("dfs")
  let data = req.body;
  console.log("body : ", data)
  // pool.query(`INSERT INTO public.client_data(title, client_id, first_name, surname, house_name, address_l2, city_and_town, postcode, telephone, mobile, email, relation_OD, name_OD, surname_OD, comments_OD, email_OD, mobile_OD, consent) VALUES (${data.title}, ${data.client_id}, ${data.first_name}, ${data.surname}, ${data.house_name}, ${data.address_l2}, ${data.city_and_town}, ${data.postcode}, ${data.telephone}, ${data.mobile}, ${data.email}, ${data.relation_OD}, ${data.name_OD}, ${data.surname_OD}, ${data.comments_OD}, ${data.email_OD}, ${data.mobile_OD}, ${data.consent})`)
  pool.query("INSERT INTO client_data (title,client_id,first_name,surname,house_name,address_l2,city_and_town,postcode,telephone,mobile,email,relation_od,name_od,surname_od,comments_od,email_od,mobile_od,consent) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
    [
      data.title,
      data.client_id,
      data.first_name,
      data.surname,
      data.house_name,
      data.address_l2,
      data.city_and_town,
      data.postcode,
      data.telephone,
      data.mobile,
      data.email,
      data.relation_OD,
      data.name_OD,
      data.surname_OD,
      data.comments_OD,
      data.email_OD,
      data.mobile_OD,
      data.consent
    ])
    .then((response) => {
      console.log("response : ", response)
      let dataresp = response
      res.send({success : true})
    }).catch((err)=>{
      res.send({success : false})
    })
})

app.get("/liveprice", cors(), async (req, res) => {
  try {
    //   axios.get('https://4f36-54-81-131-170.ngrok.io/liveprice').then(resp => {
    //     console.log("sdfsdf : ",resp)
    //     fs.writeFileSync("liveprice.json",JSON.stringify(resp.data))
    //     let data = fs.readFileSync("liveprice.json")
    //     console.log("data : ",JSON.parse(data))
    //    res.json(data)
    // });

    await live_price()

    res.send(metal_price)
  } catch (error) {
    console.log(error, "error")
  }
})



const live_price = async () => {
  try {
    await axios.get('https://4f36-54-81-131-170.ngrok.io/liveprice').then(resp => {
      metal_price = resp.data;

      console.log(metal_price[0], "metal price")
      fs.writeFileSync("datafile.json", JSON.stringify(metal_price))
      return resp.data;
    }
    );
  } catch (error) {
    console.log(error, "error")
  }
};

const update = async () => {
  try {
    await pool.query(
      "UPDATE public.new_combination_test SET fine_troy_ounce =$1, fine_weight =$2,  troyounce_gold =$3 WHERE new_code =$4",
      [fine_troy_ounce, fine_weight, troyounce_gold, newcode]
    );
    console.log("updated");
  } catch (error) {
    console.log(error, "error");
  }
};

const update_test = async (e) => {
  await getall_data();
  await live_price()
  all?.forEach((value) => {
    newcode = value.new_code;
    fine_troy_ounce = rouundoff(
      (value.gross_weight * value.fineness) / 31.1034768 / 1000
    );
    fine_weight = rouundoff((value.gross_weight * value.fineness) / 1000);
    troyounce_gold = rouundoff(fine_weight / 31.1034768);
    console.log(
      newcode,
      fine_troy_ounce,
      fine_weight,
      troyounce_gold,
      "newcode + other values"
    );
    update();
  });
};

setInterval(() => {
  update_test();
}, 30000);

app.listen(port, () => {
  console.log(`listining at port ${port}`);
});
