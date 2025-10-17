import path from "path";
import fs from "fs";
import Doctor from "../../models/Doctor/Doctor";

const postImgProfile = async (req: any, res: any) => {
  try {

    console.log(req.file,'image vannu ')
    // Check if file is uploaded
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Find the doctor's profile (adjust query as per your authentication logic)
    const doctor = await Doctor.findOne();
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });



    // If there's an existing image, remove it from disk
    if (doctor.imageUrl) {
      const oldImagePath = path.resolve(__dirname, "..", doctor.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Save the new image path to the database
    // Assuming you want to store the relative path of the file for frontend access
    const imageUrl = path.join("uploads", req.file.filename); // e.g., 'uploads/1633031234.jpg'
    doctor.imageUrl = imageUrl; // Save relative path

    await doctor.save();

    // Respond with the new image URL
    res.status(200).json({ imageUrl: doctor.imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

export default postImgProfile;
