
    const mongoose = require('mongoose')


    const url = "mongodb://admin:admin@cluster0-shard-00-00.tydff.mongodb.net:27017,cluster0-shard-00-01.tydff.mongodb.net:27017,cluster0-shard-00-02.tydff.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-dfozq4-shard-0&authSource=admin&retryWrites=true&w=majority"
    
    mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=> {
        console.log('db ad')
    }).catch((err) => {
      console.log(err)
    })
