import Doctor from "../../models/Doctor/Doctor";


const getAllDoctor = async (req:any, res:any) => {

    try {
        const doctors = await Doctor.find({});
        if(!doctors){
            return res.status(404).json({message:"No doctors found"});
        }
        res.status(200).json(doctors)
        
    } catch (error) {
        
    }
}

export default getAllDoctor;