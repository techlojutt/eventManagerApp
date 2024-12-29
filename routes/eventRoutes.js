const express = require("express")
const {createEvent,getEvents,getEventById,updateEvent,deleteEvent,userRSVPRequest,searchAndFilterEvents} = require("../controllers/eventController")


// router object
const eventRouter = express.Router()

// POST create new event

eventRouter.post('/create', createEvent)

eventRouter.get('/',getEvents) 

eventRouter.get('/:id',getEventById)

eventRouter.put('/update/:id', updateEvent)

eventRouter.delete('/delete/:id', deleteEvent)

eventRouter.post('/rsvp/:id',userRSVPRequest)

eventRouter.get('/search',searchAndFilterEvents)



// GET all events






module.exports = eventRouter

