const functions = require("firebase-functions");
const express = require("export");
const cors = require("cors");
const stripe = require("stripe")(
    "pk_test_51KWx5YBLbPWKp22CfZDDmAEbxRVLg8elOyyjyer2Udj8m61jcEs2CHi90iDV6HQ4VzvR91e8vHELQU3HQ9bLNEBL00OWtx6mGS"
);

const app = express();

app.use(cors({origin : true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("응~반갑고~"));

app.post("/payment/create", async(req, res) => {
    const total = re.query.total;
    const paymentIntet =await stripe.paymentIntets.create({
        amount : total,
        currency : "usd"
    })
    res.status(201).send ({
        clientSecret: paymentIntet.client_secret
    })
})
exports.api = functions.https.onRequest(app);


