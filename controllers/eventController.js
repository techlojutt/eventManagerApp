const Events = require('../models/eventModel');



const createEvent = async (req, res) => {
   try {
       
    let newEvent = new Events({
        title:req?.body?.title,
        description:req?.body?.description,
        location:req?.body?.location,
        category:req?.body?.category,
        visibility:req?.body?.visibility,
        createdBy:req?.body?.createdBy,
        image:req?.body?.image,  
 });

 const output = await newEvent.save();

 res.status(200).json({
    data:output,
    message:"Event Created Successfully",
    success:true
 })
    
   } catch (error) {

    res.status(501).json({
        data:[],
        message:'Error',
        success:false,
        error
    })
    
   }  
}

const getEvents = async(req,res)=>{
    try {
        const events = await Events.find();

        res.status(200).json({
            data:events,
            message:"Events Fetched Successfully",
            success:true
        })
    } catch (error) {
        res.status(501).json({
            data:[],
            message:"Error in fetching events",
            success:false,
            error
        })
    }
}


const getEventById = async(req,res)=>{
    try {
        const event = await Events.findById(req.params.id);
        
        if(!event){
            return res.status(404).json({
                data:[],
                message:"Event Not Found",
                success:false
            })
        }
        
        res.status(200).json({
            data:event,
            message:"Event Fetched Successfully",
            success:true
        })

    } catch (error) {

        res.status(501).json({
            data:[],
            message:"Error in fetching event",
            success:false,
            error
        })

    }
}


const updateEvent = async(req,res)=>{
    try {
        const event = await Events.findOneAndUpdate({id:req.params.id},{
            $set: {
                title:req?.body?.title,
                description:req?.body?.description,
                location:req?.body?.location,
                category:req?.body?.category,
                visibility:req?.body?.visibility,
                image:req?.body?.image,
                updatedAt:Date.now()
            }});
        
        
        if(!event){
            return res.status(404).json({
                data:[],
                message:"Event Not Found",
                success:false
            })
        }
        
        res.status(200).json({
            data:event,
            message:"Event Updated Successfully",
            success:true
        })
    }catch(error){

        res.status(500).json({
            data:[],
            message:"Error in updating event",
            success:false,
            error
        });

    }
}

const deleteEvent = async(req,res)=>{
    try {
        const event = await Events.findByIdAndDelete(req.params.id);
        
        if(!event){
            return res.status(404).json({
                data:[],
                message:"Event Not Found",
                success:false
            })
        }
        
        res.status(200).json({
            data:event,
            message:"Event Deleted Successfully",
            success:true
        })
    } catch (error) {
        res.status(500).json({
            data:[],
            message:"Error in deleting event",
            success:false,
            error
        })
    
}
}


const userRSVPRequest = async(req, res) => {
  
    try{
        const eventId = req.params.id;
        const userId = req.body.userId;

        const event = await Events.findById(eventId);

        if(!event){
            return res.status(404).json({
                data: [],
                message: 'Event Not Found',
                success: false,
            });
        }

        if(event.attendes.includes(userId)){
            return res.status(400).json({
                data: [],
                message: 'User already RSVPed',
                success: false,
            });
        }
        
        event.attendes.push(userId);

        await event.save();

        res.status(200).json({
            data: event,
            message: 'User RSVPed Successfully',
            success: true,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            data: [],
            message: 'Error in RSVP Request',
            success: false,
            error,
        });
    }}

 
    const searchAndFilterEvents = async (req, res) => {
        try {
       const event = await Event.find({
        $text: { $search: req.query.search }, // Text search
        category: req.query.category,                    // Filter by category
      })
        .sort({ createdAt: -1 }) // Sort by newest
        .skip((page - 1) * 10)   // Paginate
        .limit(10);         

            res.status(200).json({
                data:event,
                message: 'Events Fetched Successfully',
                success: true,
                
            });
        
    }catch (error){
        console.log(e);
        res.status(500).json({
            data: [],
            message: 'Error in Searching Events',
            success: false,
            error,
        });
    }
    }

    


module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    userRSVPRequest,
    searchAndFilterEvents,
}