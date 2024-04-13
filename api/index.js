//  to install express 
const express=require("express")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config();

const stripe=require("stripe")(process.env.STRIPE_SECRET)

// to return hellp world
app.get("/",(req,res)=>{
    res.send("hello world "+ process.env.STRIPE_SECRET)
})

app.post('/create-checkout-session',async(req,res)=>{
    const {products}=req.body
    console.log(products,"aaaaaaaaaaa")
    const lineitems=products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name
            },
            unit_amount:Math.round(product.price*100)
        },
        quantity:product.quantity
    }));
    console.log(lineitems,'11111111111111111')
    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:lineitems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    })

    res.json({id:session.id})
})

app.listen(3001,()=>{
    console.log("server is running")
})