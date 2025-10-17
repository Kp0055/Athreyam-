import Doctor from "../../models/Doctor/Doctor";

const doctorUpdate = async (req: any, res: any) => {
  try {
    const docId = req.user?.id;

    if (!docId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      bio,
      gender,
      experience,
      dob,
      city,
      state,
      country,
      certifications,
      education,
      consultation,
      languages,
    } = req.body;

    // Prepare update object — filter out undefined or null fields if you want
    const updateData: any = {
      firstName,
      lastName,
      email,
      phoneNumber,
      bio,
      gender,
      experience,
      dob,
      city,
      state,
      country,
      certifications,
      education,
      consultation,
      languages,
    };

    // Optional: remove undefined keys to avoid overwriting with undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    // If some fields like certifications, education, etc., come as comma-separated strings, parse them here
    if (typeof updateData.certifications === "string") {
      updateData.certifications = updateData.certifications
        .split(",")
        .map((s: any) => s.trim());
    }
    if (typeof updateData.education === "string") {
      updateData.education = updateData.education.split(",").map((s: string) => s.trim());
    }
    if (typeof updateData.consultation === "string") {
      updateData.consultation = updateData.consultation
        .split(",")
        .map((s: any) => s.trim());
    }
    if (typeof updateData.languages === "string") {
      updateData.languages = updateData.languages.split(",").map((s: string) => s.trim());
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(docId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default doctorUpdate;
