import express from 'express';
import { registerUser } from '../../controller/user/register';
import {  googleAuth,googleAuthCallback } from '../../controller/googleAuth';
import getProfileDetails from "../../controller/user/userData";
import loginUser from '../../controller/user/login';
import logout from '../../controller/user/logout';
import profileEdit from '../../controller/user/userProfileEdit'
import authMiddleware from '../../middlewares/user/authMiddleware';
import findDoctor from '../../controller/user/findDoctor';
import allPost from '../../controller/user/post'
import createOrder from '../../utils/payment/payment'
import verifyPayment from '../../utils/payment/verify';
import appoiments from '../../controller/user/appoiment';
import bookingCancel from '../../controller/user/bookingCancel';
import postLike from '../../controller/user/postLike';
import saveOrUnsavePost from '../../controller/user/savedPost';
import filterDoc from '../../controller/user/docFilter';
import postComments from '../../controller/user/postcomments';
import getComment from '../../controller/user/getcomment';
import getSavedPosts from '../../controller/user/getSavedpost';
import followingData from '../../controller/user/follow';
import getAllDoctor from '../../controller/user/getAllDoc';
import docProfileById from '../../controller/user/docprofile';
import { getDoctorPosts } from '../../controller/user/getDocPost';

const router = express.Router();

// User registration
router.post('/users/register', registerUser);
router.post('/users/login',loginUser)

// Google authentication 
router.get('/users/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);

//verification 
router.get('/users/verify-token', authMiddleware, getProfileDetails);
router.post('/users/logout',logout)

//User Profile

router.get("/users/userProfile", authMiddleware, getProfileDetails);
router.get("/users/profile/info/details", authMiddleware, getProfileDetails);
router.put('/user/profile/info/Edit', authMiddleware, profileEdit);
router.get('/users/findDoctor',authMiddleware,findDoctor)
router.get('/users/feed',authMiddleware,allPost);


router.post('/users/payment/create-order',authMiddleware,createOrder)
router.post('/users/payment/verify-payment',authMiddleware,verifyPayment)

router.get('/users/appoiment',authMiddleware,appoiments)
router.post('/users/cancel',authMiddleware,bookingCancel)
router.put('/:postId/like',authMiddleware,postLike)
router.put('/:postId/save',authMiddleware,saveOrUnsavePost)
router.post('/users/filters',authMiddleware,filterDoc)
router.post('/:selectedPostId/comment',authMiddleware,postComments)
router.get('/:postId/comments',authMiddleware,getComment)
router.get('/user/saved-posts',authMiddleware,getSavedPosts)
router.post('/users/follow/:doctorId',authMiddleware,followingData)
router.get("/user/getAllDoctor", authMiddleware,getAllDoctor);
router.get("/user/getDoctor/:id", authMiddleware,docProfileById);
router.get('/user/doctorPosts/:doctorId', authMiddleware,getDoctorPosts);




export default router;
