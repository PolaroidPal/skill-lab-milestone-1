const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

const cron = require('node-cron')

// cron.schedule('* * * * *', ()=> {
//     console.log('Executing it every minute')
// })

// cron.schedule('*/5 * * * *', ()=> {
//     console.log('Executing it every 5 minutes')
// })

let menuItems = [
   {
      id: 1,
      itemName: "Idli",
      price: 30,
      category: "Breakfast"
   },
   {
      id: 2,
      itemName: "Masala dose",
      price: 40,
      category: "Breakfast"
   },
   {
      id: 3,
      itemName: "Pulav",
      price: 50,
      category: "Breakfast"
   },
   {
      id: 4,
      itemName: "Mini meal",
      price: 55,
      category: "Lunch"
   },
   {
      id: 5,
      itemName: "Special meal",
      price: 70,
      category: "Lunch"
   },
   {
      id: 6,
      itemName: "North indian",
      price: 80,
      category: "Lunch"
   },
   {
      id: 7,
      itemName: "South indian meal",
      price: 80,
      category: "Lunch"
   },
   {
      id: 8,
      itemName: "Chips",
      price: 25,
      category: "Snacks"
   },
   {
      id: 9,
      itemName: "Biscuits",
      price: 10,
      category: "Snacks"
   },
   {
      id: 10,
      "itemName": "Cookies",
      "price": 35,
      "category": "Snacks"
   }
]

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.send("Hello I'am Mahesh")
})

app.get('/menu', (req, res) => {
   res.json(menuItems)
})

app.post('/menu', (req, res) => {
   const newItem = req.body;
   console.log(newItem)

   menuItems.push(newItem)
   res.send('Data received')
})

app.post('/orders', (req, res) => {
   const orderedItems = req.body;
   console.log(orderedItems)
   orderFood()
   processFood()
   deliverFood()
   res.json(orderedItems)
})

app.get('/detailbyid', (req, res) => {
   const itemToFind = req.query.id
   console.log(itemToFind)
   let found = menuItems.find(function (element) {
      console.log(element.id)
      if (element.id == itemToFind) {
         return element;
      }
  });

  console.log(found)

  res.json(found);
}) 


function orderFood() {
   return new Promise((resolve, reject) => {
      const task3 = cron.schedule('*/1 * * * *', ()=> {
         console.log('Food ordered')
         task3.stop()
      })
   })
}

function processFood() {
   return new Promise((resolve, reject) => {
         const task2 = cron.schedule('*/2 * * * *', ()=> {
            console.log('Food processed')
            task2.stop()
         })
   })
}

function deliverFood() {
   return new Promise((resolve, reject) => {
      const task = cron.schedule('*/3 * * * *', ()=> {
         console.log('Food delivered')
         task.stop()
      })
   })
}

app.listen(PORT, () => {
   console.log("Server started")
})