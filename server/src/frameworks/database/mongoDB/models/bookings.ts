import { Schema,model } from "mongoose";

const bookingsSchema = new Schema({
    eventId:{
        type:String,
        required:[true,'please add eventId'],
    },
    userId:{
        type:String,
        required:[true,'please add userId']
    },
    bookingTime:{
        type:String,
        required:[true,'please add time']
    },
    contactInfo:{
        type:Object,
        required:[true,'please add contactInfo']
    },
    ticketCount:{
        type:Number,
        required:[true,'please add ticket count']
    },
    status:{
        type:String,
        required:[true,'please add ticket count']
    }
})

const Bookings = model('Bookings',bookingsSchema,'bookings')

export default Bookings