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


app.use(bodyParser.json());
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
  const { username, password, priviliges = 10} = req.body

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


  const userToAdd = new User({ username, password, priviliges})
  try {
    await userToAdd
    .save()
    .then(() => {

      //make the login server-sided
      
      res.status(201).json({note: 'ok'})
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

    // console.log(data)
    //   // test a matching 
    // console.log(user)
    data.comparePassword(password, (err, match) => {
      if (err) throw err;

      if (!match) {
        res.status(404).json({note: 'badPasswordLength'})
      } else {
        res.status(404).json({note: 'ok', username: data.username, id: data._id})
      }
    })
       
  } catch(error) {
    res.status(500).json({note: 'errorWithUser', errors: error})
    console.log(error)
  }
})


app.post('/showVisits', async(req, res) => {
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
    let user = await User.findOne({ username: username }).select("id")
    if (!user) {
      res.status(402).json({note: 'noUserFound'})
      return
    }

    let visits = await Visit.find({owner: user._id}).select("dayHour dayDate").exec()
    console.log(visits)

       
  } catch(error) {
    res.status(500).json({note: 'errorWithUser', errors: error})
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
  const { username, dayHour, dayDate} = req.body

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
      const visitToAdd = new Visit({owner: user._id, dayDate, dayHour, occupied: false})

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

app.listen(5000, () => { console.log("server running at 5000")})