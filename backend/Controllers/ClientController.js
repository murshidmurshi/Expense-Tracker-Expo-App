const Client = require("../Models/Client");

const AddClient = async (req, res) => {
    try {
        let { name, phone, place,avtar } = req.body;
        // console.log(req.body);
        let client_details = await Client.findOne({ phone })
        if (client_details) {
            return res.json({ success: false, error: "client already exists" })
        }
        else {
            const newClient = new Client({ name, phone, place,avtar });
            const savedClient = await newClient.save()
            return res.json({ success: true, savedClient })
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


const View = async (req, res) => {
    try {
        if (req.params.id) {
            console.log('Id is there');
        }
        else {
            let clients = await Client.find()
            res.json({ success: true, clients })
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Error!!!")
    }
}


module.exports = { AddClient, View }

