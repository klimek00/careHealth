const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises

const app = express()
const uri = require('./totalnie')
const { compareSync } = require('bcrypt')

//prevent xml
function convertHTML(str) {
  const convert = {
      '&': "&amp;",
      '<': "&lt;",
      '>': "&gt;",
      '"': "&quot;",
      '\'': "&apos;"
  }
  return str.replace(/[&<>'"]/g, ((char) => convert[char])); 
}


/**
 * TODO: find user in user database and validate its priliviges
 * code needs huge optimalization: often uses the same lines
 */

async function dbConnect({mongoose, uri: {item}}) {
  await mongoose.connect(item)
  .then(() => {
    if (mongoose.connection.readyState !== 1) {
      console.error('error connecting to DB', )
      return false
    }
  })
  return true
}


app.use(bodyParser.json())
app.get('/api', async (req, res) => {
  // console.log(req.query.data)
  if (req.query.data === 'doctorsData') {
    // console.log('received req: ', req.query.data)
    const doctorsData = await fs.readFile('./data/doctorsData.json')

    //already is json
    res.send(doctorsData)
  } else if (req.query.data === 'specialtyData') {
    const specialtyData = await fs.readFile('./data/specialtyData.json')

    res.send(specialtyData)
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
  // res.json({"users": ["useroneE", "userTwo"]})
})

app.post('/register', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')

  //default priviliges = 10 if register via site
  const { username, password, place, contact, priviliges=10, price=150} = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  //TODO: maybe move final validation to the server?
  if (password !== null && password.length < 8) {
    res.status(404).json({note: 'badPasswordLength'})
    return
  }


  const userToAdd = new User({ username, password, place, contact, priviliges, price})
  try {
    await userToAdd
    .save()
    .then(() => {

      //make the login server-sided
      
      res.status(201).json({note: 'ok', username: username})
      return
    })
  } catch (error) {
      res.status(404).json({note: 'uncaughtError', errors: error})
      return
  }
})

app.post('/login', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  const { username, password} = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  //TODO: maybe move final validation to the server?
  if (password !== null && password.length < 8) {
    res.status(404).json({note: 'badPasswordLength'})
    return
  }

  try {
    const data = await User.findOne({ username: username })

    if (!data) {
      res.status(500).json({note: 'noUserFound', errors: error})
      return

    }

    // console.log(data)
    //   // test a matching 
    data.comparePassword(password, (err, match) => {
      if (err) throw err;

      if (!match) {
        res.status(404).json({note: 'badPasswordLength'})
      } else {
        res.status(201).json({note: 'ok', username: data.username, id: data._id})
      }
    })
       
  } catch(error) {
    res.status(500).json({note: 'errorWithUser', errors: error})
    console.log(error)
  }
})


app.post('/addUserSpecialty', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  console.log("addVisit")

  //default priviliges = 10 if register via site
  const { username, specialty } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  //TODO: maybe move final validation to the server?

  try {
    const query = await User.findOneAndUpdate({username: username}, {$push: {specialty: specialty}})

    if (!query) {
      res.status(404).json({note: 'errorSpecialty'})
      return
    } else {
      res.status(201).json({note: "ok"})
    }

  } catch(e) {
    console.log(e)
  }
})

app.post('/updateUser', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')

  //default priviliges = 10 if register via site
  const { username, field, value } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }



  //TODO: final validation (id, property query, field is not password etc)
  try {
    console.log(username, field, value)
    const query = await User.findOneAndUpdate({ username: username }, {[field]: value})

    if (!query) {
      res.status(404).json({note: 'errorSpecialty'})
      return
    } else {
      res.status(201).json({note: "ok"})
    }

  } catch(e) {
    console.log(e)
  }
})


app.post('/getVisits', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  const Visit = require('./schema/visitSchema')
  const { username } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  try {
    const user = await User.findOne({ username: username }).select("id")
    const today = new Date().setHours(0, 0, 0, 0)

    if (!user) {
      res.status(402).json({note: 'noUserFound'})
      return
    }

    const visits = await Visit
    .find({owner: user._id, dayDate: {$gte: today}})
    .select("id dayHour dayDate occupied patient")
    .exec()

    if (!visits) {
      res.status(402).json({note: 'noVisitsFound'})
      return
    }

    res.status(201).json({note: 'ok', visits})

       
  } catch(error) {
    res.status(500).json({note: 'errorWithUser', errors: error})
    console.log(error)
  }
})

app.post('/deleteVisit', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  const Visit = require('./schema/visitSchema')
  const { username, visitId } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  try {
    const user = await User.findOne({ username: username }).select("id")
    if (!user) {
      res.status(400).json({note: 'noUserFound'})
      return
    }

    const visit = await Visit.deleteOne({owner: user._id, _id: visitId}).exec()
    if (!visit.acknowledged) {
      res.status(405).json({note: 'noVisitsFound'})
      return
    } else {
      res.status(201).json({note: 'ok'})
    }
    
  } catch(error) {
    res.status(500).json({note: 'errorWithDelete:', errors: error})
    console.log(error)
  }
})


/**
 * todo: add visitor data schema
 */
app.post('/addVisit', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  const Visit = require('./schema/visitSchema')
  console.log("addVisit")

  //default priviliges = 10 if register via site
  const { username, dayHour, dayDate, occupied=false, patient='' } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  //TODO: maybe move final validation to the server?

  try {
    let user = await User.findOne({ username: username }).select("id")
    
    if (user) {
      const visitToAdd = new Visit({owner: user._id, dayDate, dayHour, occupied: occupied, patient: patient})

      await visitToAdd
      .save()
      .then(() => {
          res.status(201).json({note: 'ok'})
      })
    }


  } catch(e) {
    console.log(e)
  }



})

app.post('/getWorkerData', async(req, res) => {
  const mongoose = require('mongoose')
  const User = require('./schema/userSchema')
  const Visit = require('./schema/visitSchema')
  const { username } = req.body

  try {
    dbConnect({mongoose, uri})
  } catch(error) {
    res.status(500).json({note: 'noServerConnection', errors: error})
    return
  }


  try {
    const user = await User.findOne({ username: username }).select("id username place contact price priviliges specialty")
    if (!user) {
      res.status(402).json({note: 'noUserFound'})
      return
    }

    res.status(201).json({note: 'ok', user})

       
  } catch(error) {
    res.status(500).json({note: 'errorWithUser', errors: error})
    console.log(error)
  }
})

app.listen(5000, () => { console.log("server running at 5000")})