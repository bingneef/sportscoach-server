import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const AttendanceSchema = new Schema({
  programmeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Programme'
  },
  userId: {
    type: String,
    index: true,
    required: true,
  },
  present: {
    type: Boolean,
    index: true,
  },
  remarks: String,
})

class AttendanceClass { }

AttendanceSchema.loadClass(AttendanceClass)

export const Attendance = mongoose.model('Attendance', AttendanceSchema)
