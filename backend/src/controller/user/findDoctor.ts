import Doctor from "../../models/Doctor/Doctor";

const findDoctor =  async (req:any , res:any )=>{

    try{

        const response = await Doctor.find({})
        console.log(response,"backile data fetch cheyithuu")

        if(!response){
            res.status(404).json({message:"failed to fetch the data in backend "})
        }else{
            res.status(200).json ({message:"sucessfull",response})
        }
    }
    catch(error){
        res.status(500).json({error:"internal server error"})
    }

}

export default findDoctor;
