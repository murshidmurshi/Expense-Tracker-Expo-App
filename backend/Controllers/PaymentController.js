const { default: mongoose } = require("mongoose");
const Payment = require("../Models/Payment");

const AddPayment = async (req, res) => {
    try {
        const { amount, payment_type, project_id, client_id, description, avtar,payment_date } = req.body;
        const newPayment = new Payment({ amount, payment_type, project_id, client_id, description, avtar ,payment_date});
        const savedPayment = await newPayment.save()
        return res.json({ success: true, savedPayment })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server err !!')
    }
}
const View = async (req, res) => {
    try {
        let id = req.params.id
        const paymentwithTotal = await Payment.aggregate([
            {
              $match: {
                project_id: new mongoose.Types.ObjectId(id),
              },
            },
            {
              $group: {
                _id: null,
                payments: { $push: '$$ROOT' },
                totalPaid: { $sum: '$amount' },
              },
            },
          ]);
        //   console.log(paymentsWithTotal[0],666666666);
        // const payment = await Payment.find({ project_id: id })
        if (paymentwithTotal) {
          
            let PaymentList=(paymentwithTotal.length > 0) ? paymentwithTotal[0].payments : [];
            let TotalAmount=(paymentwithTotal.length>0)?paymentwithTotal[0].totalPaid:[];
            // let PaymentList=paymentwithTotal[0].payments||[];
            // let TotalAmount=paymentwithTotal[0].totalPaid||[];
            // console.log(PaymentList,'PaymentListPaymentList');
            // console.log(TotalAmount,'TotalAmountTotalAmount');
            return res.json({ success: true, payment:PaymentList,totalPaid:TotalAmount })
            
        }
        else {
            return res.json({ success: false, message: "Payment not found!!!" })
        }

        

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server err !!')
    }
}
module.exports = { AddPayment, View }