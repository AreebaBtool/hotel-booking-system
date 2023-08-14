const express=require('express');
const router=express.Router();
const stripe = require('stripe')('sk_test_51Naw4zGClg2jznXpxKGPBTg1W1tWluctkjo9HY0dvM9LQ1vqY3StzKMsgAt0j8kpavT7i2BFAOrXfYDKTKgHzTON000JBzMk7D')

router.get('/',(req,response)=>{
    async function checkout(){
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data:{
                    currency: 'pkr',
                    product_data:{
                        name: 'Room',
                        images:['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&w=1000&q=80'],
                    },
                    unit_amount: 200000 * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:4000/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:4000',
          });
          return session.url;
    }

    checkout().then((url)=>response.redirect(url))
    .catch((error)=>console.log(error));
})
module.exports=router