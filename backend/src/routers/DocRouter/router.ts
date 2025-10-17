import express from "express";
import VerifyToken from "../../middlewares/doctor/docAuthMiddlware";
import DoctorRegister from "../../controller/doctorController/docRegister";
import PofileDetails from "../../controller/doctorController/profileDetails";
import DoctorLogin from "../../controller/doctorController/doctorLogin";
import DoctorUpdate from "../../controller/doctorController/profileUpdate";
import { upload } from "../../utils/multerconfig";
import verifyToken from "../../middlewares/doctor/docAuthMiddlware";
import { createPost, getPosts } from "../../controller/doctorController/post";
import bookingList from "../../controller/doctorController/bookingList";
import transctionList from "../../controller/doctorController/paymentdoctor/paymentTranscation";
import changePassword from "../../controller/doctorController/changePassword";
import postCertification from "../../controller/doctorController/certification";
import getCertification from "../../controller/doctorController/getCertification ";
import educationPost from "../../controller/doctorController/education";
import getEducation from "../../controller/doctorController/getEducation";
import postImgProfile from "../../controller/doctorController/postImgProfile";
import dashboardCount from "../../controller/doctorController/dashboardCount";
import logoutDoctor from "../../controller/doctorController/logout";

const router = express.Router();

//register and Login
router.post("/doctor/Register", DoctorRegister);
router.post("/doctor/login", DoctorLogin);

// verfiy the user
router.get("/doctor/verify-Token", VerifyToken, PofileDetails);

router.get("/doctor/profile", VerifyToken, PofileDetails);
router.put("/doctor/profile/update", VerifyToken, DoctorUpdate);

//post
router.post(
  "/doctor/createPost",
  verifyToken,
  upload.single("image"),
  createPost
);
router.get("/doctor/post", verifyToken, getPosts);

router.get("/doctor/appoimentlist", verifyToken, bookingList);
router.get("/doctor/paymentTranscation", verifyToken, transctionList);
router.post("/doctor/changePassword", verifyToken, changePassword);
router.post("/doctor/certifications", verifyToken, postCertification);
router.get("/doctor/certifications", verifyToken, getCertification);
router.post("/doctor/education",verifyToken,educationPost)
router.get("/doctor/education",verifyToken,getEducation)
router.post("/doctor/profile-image", verifyToken,upload.single("profileImage"),postImgProfile)
router.get("/doctor/dashboard-counts", verifyToken,dashboardCount)
router.get("/doctor/logout", verifyToken,logoutDoctor);



export default router;
