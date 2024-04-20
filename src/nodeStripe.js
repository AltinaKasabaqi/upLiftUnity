require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: router } = require('./router');
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/stripe",stripe);



const storeItems = new Map([
    [1, { priceInCents: 1000, name: "Paketa 1" }],
    [1, {priceInCents:10000, name:"Paketa 2" }],
    [1, {priceInCents: 20000, name:"Paketa 3"}]
]);
 
router.get("/success", async (req,res)=>{  
    const session_id = req.query.session_id;
    try{
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if(session.payment_status === 'paid'){
            res.send("Donacioni u realizua me sukses!");
        }else{
            res.send("Donacioni deshtoi te realizohet!");
        }
    }catch(error){
        res.send("Gabim gjate aprovimit te pageses!");
    }
})

app.get("/cancel",(req,res)=>{
    res.send("Pagesa nuk u realizua!");
})



app.post('/create-checkout-session', async (req, res) => {
    // try {
    //     const itemId = req.params.itemId;
    //     const storeItem = storeItems.get(itemId);
    //     if (!storeItem) {
    //         return res.status(404).json({ error: 'Item not found' });
    //     }
    try {
        const storeItem = storeItems.get(1);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
          
            line_items: [
                {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents,
                },
                quantity: storeItem.quantity,
            }
        ],
            success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:8080/cancel`,
            billing_address_collection: 'required',
        }); 
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Stripe webhook

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {

    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body.toString(), sig, endpointSecret);
    } catch (err) {
        console.log(`Failed to verify Stripe webhook signature. Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const stripeWebhookData = event.data.object;

        const paymentData = JSON.stringify(stripeWebhookData);


        console.log({ paymentData });


        const p_email = stripeWebhookData.customer_details.email;
        const qyteti = stripeWebhookData.customer_details.address.city;
        const shuma = `${Number(stripeWebhookData.amount_subtotal / 100)}€`;

        // const sqlProcedureCommand = `CALL save_payment(?,?,?)`;

        console.log(p_email,qyteti,shuma);
        // connection.query(sqlProcedureCommand, [p_email, qyteti, shuma], (err, results) => {
        //     if (err) {
        //         console.log('Error:', err); 
        //         console.log('Error:', err);
        //         res.status(500).end();
        //     }
        //     console.log('results:', results); 
        //     console.log('results:', results); 
            // res.status(200).end();
          
        // });
        
    }
});




app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });