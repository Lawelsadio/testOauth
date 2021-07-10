const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const authcontroller = require("../controllers/auth.controller");

router.post("/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],authcontroller.signup,authcontroller.getAllRoles);

router.post("/auth/signin", authcontroller.signin);

router.get("/test/all", (req, res) => {
  res.status(200).send("Public Content.");
});
router.get("/test/allUsers",authcontroller.getAllUsers);
router.get('test/editUser/:id',authcontroller.getOneUser);
router.put('test/update/:id',authcontroller.updateOneUser);
router.get("/test/allRoles",authcontroller.getAllRoles);

router.get("/test/user", [authJwt.verifyToken], (req, res) => {
  res.status(200).send("User Content.");
});

router.get("/test/assistant",[authJwt.verifyToken, authJwt.isAssistant],(req, res) => {
    res.status(200).send("Assistant Content.");
  }
);

router.get("/test/admin",[authJwt.verifyToken, authJwt.isAdmin],(req, res) => {
    res.status(200).send("Admin Content.");
  }
);
router.get('/test/edit/:id',authcontroller.getOneUser)

router.put('/test/update/:id',authcontroller.updateOneUser);

router.delete('/test/delete/:id',authcontroller.delete);

module.exports = router;
