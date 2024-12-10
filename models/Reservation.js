const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seats: { type: Number, required: true },
});

module.exports = mongoose.model("Reservation", ReservationSchema);