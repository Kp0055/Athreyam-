import mongoose, { Schema, Document } from "mongoose";

// -------- Sub-document Interfaces --------
interface Certification {
  title: string;
  organization: string;
  date: string;
  credentialUrl?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

// -------- Main User Interface --------
interface DocUser extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: number;
  bio?: string;
  gender?: string;
  experience?: string;
  dob?: Date;
  city?: string;
  state?: string;
  country?: string;
  certifications?: Certification[];
  education?: Education[];
  consultation?: string[];
  languages?: string[];
  speciality?: string;
  role?: "doctor";
  imageUrl?: string; // <-- ✅ New field
}


// -------- Sub-schemas --------
const CertificationSchema = new Schema<Certification>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String, required: true },
    credentialUrl: { type: String },
  },
  { _id: false }
);

const EducationSchema = new Schema<Education>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String },
  },
  { _id: false }
);

// -------- Main doctor schema --------
const doctorSchema = new Schema<DocUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  bio: { type: String, default: "" },
  gender: { type: String, default: "" },
  experience: { type: String, default: "" },
  dob: { type: Date },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "" },

  certifications: {
    type: [CertificationSchema],
    default: [],
  },

  education: {
    type: [EducationSchema],
    default: [],
  },

  consultation: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  speciality: { type: String, default: "" },
  role: { type: String, default: "doctor", enum: ["doctor"] },

  imageUrl: { type: String, default: "" }, // <-- ✅ New field
});


export default mongoose.model<DocUser>("docdata", doctorSchema);
