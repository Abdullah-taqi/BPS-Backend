const express = require("express")
const app = express()
const WebSocket = require('ws');
const protobuf = require('protobufjs')
var { Buffer } = require('buffer/');
const mongoose = require("mongoose")
const Updates = require('./data')
const News = require('./news-update')
const Nifty = require('./nifty-gainers')
const Morning = require('./morning-scan')
const Cac = require('./cac-gainers')
const Career = require('./careers')
const Research = require('./research-update')
const Sp = require('./sp-gainers')
const Sgx = require('./sgx-gainers')
const Ixic = require('./IXIC-Model')
const Gdaxi = require('./GDAXI-Model')
const Bsesn = require('./BSESN-Model')
const Nsei = require('./NSEI-Model')
const Fchi = require('./FCHI-Model')
const Bzf = require('./BZF-Model')
const Dji = require('./DJI-Model')

const Mospi = require('./mospi-updates')


const cors = require("cors");
app.use(cors())
require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
port = process.env.PORT || 3001


const connectDB = (url) => {
    return mongoose.connect(url)
}

const ws = new WebSocket('wss://streamer.finance.yahoo.com');
const root = protobuf.load('YPricingData.proto', (error, root) => {

    if (error) {
        console.log(error);
    }

    const Yaticker = root.lookupType("yaticker");


    ws.onopen = function open() {
        console.log('connected');
        ws.send(JSON.stringify({
            // subscribe: [`${props.Ticker}`]
            subscribe: ["^NSEI", "^BSESN", "^IXIC", "^GDAXI", "^FCHI", "^BZ=F", "^DJI"]
        }));
    };

    ws.onclose = function close() {
        console.log('disconnected');
    };

    ws.onmessage = async function incoming(message) {
        // console.log('comming message')
        // console.log()
        const next = Yaticker.decode(new Buffer(message.data, 'base64'));
        // console.log(next);
        // let payload = {
        //         'name': next.id,
        //         'price': next.price,
        //         'changePercent': next.changePercent
        //     }
        // let res = await Axios.post("http://localhost:3001/socket", payload)
        // stock = next;

        let name = next.id
        let price = next.price
        let changePercent = next.changePercent


        if (name === "^GDAXI") {
            // mongoose.connection.db.dropCollection("gdaxi",
            //     function(err, result) {}
            // )
            await Gdaxi.create({
                name: name,
                price: price,
                changePercent: changePercent
            })
        }
        if (name === "^BSESN") {
            // mongoose.connection.db.dropCollection("bsesn",
            //     function(err, result) {}
            // )
            await Bsesn.create({
                name: name,
                price: price,
                changePercent: changePercent
            })
        }
        if (name === "^IXIC") {
            // mongoose.connection.db.dropCollection("ixic",
            //     function(err, result) {}
            // )
            await Ixic.create({
                name: name,
                price: price,
                changePercent: changePercent
            })
        }
        if (name === "^NSEI") {
            // mongoose.connection.db.dropCollection("nsei",
            //     async function(err, result) {})
            await Nsei.create({
                name: name,
                price: price,
                changePercent: changePercent

            })
        }
        if (name === "^BZ=F") {
            // mongoose.connection.db.dropCollection("bzf",
            //     async function(err, result) {})
            await Bzf.create({
                name: name,
                price: price,
                changePercent: changePercent

            })

        }
        if (name === "^DJI") {
            mongoose.connection.db.dropCollection("dji",
                async function(err, result) {
                    await Dji.create({
                        name: name,
                        price: price,
                        changePercent: changePercent
                    })
                }
            )

        }
        if (name === "^FCHI") {
            // mongoose.connection.db.dropCollection("fchi",
            //     async function(err, result) {})
            await Fchi.create({
                name: name,
                price: price,
                changePercent: changePercent

            })

        }



    };

});


app.get("/", async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send("home")

})

app.get("/data", async(req, res) => {
    const data = await Updates.find({})
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ updates: data })
})

app.get("/news-update", async(req, res) => {
    const data = await News.find({}).sort({ iso_date: -1 })
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ articles: data })
})
app.get("/research-update", async(req, res) => {
    const data = await Research.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ papers: data })
})
app.get("/nifty-gainers", async(req, res) => {
    const data = await Nifty.find({}).sort([
        ['_id', -1]
        
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ nifty: data })
})
app.get("/sp-gainers", async(req, res) => {
    const data = await Sp.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ sp: data })
})
app.get("/cac-gainers", async(req, res) => {
    const data = await Cac.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ cac: data })
})
app.get("/sgx-gainers", async(req, res) => {
    const data = await Sgx.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ sgx: data })
})
app.get("/morning-scan", async(req, res) => {
    const data = await Morning.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json({ morning: data })

})

app.get("/mospi-updates", async(req, res) => {
        const data = await Mospi.find({}).sort([
            ['_id', -1]
        ])
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json({ mospi: data })
    })
    // app.get("/job-list", async (req, res)=>{
    //     const data = await Career.find({}).sort( [['_id', -1]] )
    //     res.setHeader("Access-Control-Allow-Origin","*")
    //     res.json({jobs:data})
    // })
app.get("/testing", (req, res) => {
    res.send("testing page")
})

app.post("/socket", async(req, res) => {
    console.log(req.body)
    console.log(1)

    let name = req.body.name
        // console.log(name)

    if (name === "^GDAXI") {
        mongoose.connection.db.dropCollection("gdaxi",
            function(err, result) {}
        )
        await Gdaxi.create({
            name: req.body.name,
            price: req.body.price,
            changePercent: req.body.changePercent
        })
    }
    if (name === "^BSESN") {
        mongoose.connection.db.dropCollection("bsesn",
            function(err, result) {}
        )
        await Bsesn.create({
            name: req.body.name,
            price: req.body.price,
            changePercent: req.body.changePercent
        })
    }
    if (name === "^IXIC") {
        mongoose.connection.db.dropCollection("ixic",
            function(err, result) {}
        )
        await Ixic.create({
            name: req.body.name,
            price: req.body.price,
            changePercent: req.body.changePercent
        })
    }
    if (name === "^NSEI") {
        mongoose.connection.db.dropCollection("nsei",
            async function(err, result) {
                await Nsei.create({
                    name: req.body.name,
                    price: req.body.price,
                    changePercent: req.body.changePercent
                })
            }
        )

    }

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendStatus(201)

})


app.get("/get-ixic", async(req, res) => {
    const data = await Ixic.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})
app.get("/get-bsesn", async(req, res) => {
    const data = await Bsesn.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})
app.get("/get-nsei", async(req, res) => {
    const data = await Nsei.find({}).sort([
            ['_id', -1]
        ])
        // console.log(data[0])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})
app.get("/get-gdaxi", async(req, res) => {
    const data = await Gdaxi.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})

app.get("/get-fchi", async(req, res) => {
    const data = await Fchi.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})

app.get("/get-dji", async(req, res) => {
    const data = await Dji.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})

app.get("/get-bzf", async(req, res) => {
    const data = await Bzf.find({}).sort([
        ['_id', -1]
    ])
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(data[0])
})

const start = async() => {
    try {
        await connectDB("mongodb+srv://bpsfocusenergy:bpsfocusenergy32@cluster0.3muhn.mongodb.net/bps?retryWrites=true&w=majority")
        app.listen(port, () => {
            console.log("server is listening on port 3001")
        })
    } catch (error) {
        console.log(error)
    }
}
start()