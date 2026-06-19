import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: "rzp_test_T3OuKXtKnGoAlB",
  key_secret: "Br076QdmIXEdTciDZn7nmSVX",
})

async function test() {
  try {
    const userId = "1e32b28f-d37b-4ed6-a449-65a2015696a4";
    const options = {
      amount: 500000,
      currency: "INR",
      receipt: `rcpt_${userId.substring(0,8)}_${Date.now()}`,
    }
    const order = await razorpay.orders.create(options);
    console.log("Success:", order.id);
  } catch (error) {
    console.error("Razorpay Error:", error);
  }
}

test();
