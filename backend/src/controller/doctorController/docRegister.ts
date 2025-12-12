import DocUser from "../../models/Doctor/Doctor";
import bcrypt from "bcryptjs"

const DocUserData = async (req: any, res: any) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  console.log(
    { firstName, lastName, email, password, phoneNumber },
    "NJN BACKENDILE VANNU"
  );

    try {

      const salt = 10
      const hashedPassword = await bcrypt.hash(password,salt);

      if(!hashedPassword){
        res.status(404).json({meaasge:"password not hashed"})
      }

    const newDoc = new DocUser({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      phoneNumber,
      role: "doctor",
    });
    await newDoc.save();
    res.status(200).json("sucessfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

export default DocUserData;
