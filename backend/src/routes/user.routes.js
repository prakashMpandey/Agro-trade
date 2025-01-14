import { Router} from "express";
import { loginUser, logoutUser, registerUser, verifyEmail,forgotPassword,resetPassword, isLoggedIn, addContactDetails, addAvatar, updateProfile } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware,.js";

const router=Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/logout").post(verifyToken,logoutUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.get("/isLoggedIn",verifyToken,isLoggedIn);
router.post("/add-details",verifyToken,upload.none(),addContactDetails);
router.post("/add-avatar",verifyToken,upload.single("avatar"),addAvatar)
router.put('/update-profile', verifyToken, updateProfile);

export default router;