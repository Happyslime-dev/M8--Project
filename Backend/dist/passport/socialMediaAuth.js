"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthenticate = exports.FBAuthenticate = void 0;
const User_1 = require("../entities/User");
const tokenHandler_1 = require("../utils/tokenHandler");
const { FRONTEND_URI } = process.env;
exports.FBAuthenticate = async (req, res) => {
    if (!req.userProfile)
        return;
    const { id, emails, displayName, provider } = req.userProfile;
    try {
        const user = await User_1.UserModel.findOne({ facebookId: id });
        let token;
        if (!user) {
            const newUser = await User_1.UserModel.create({
                username: displayName,
                email: (emails && emails[0].value) || provider,
                facebookId: id,
                password: provider,
            });
            await newUser.save();
            token = tokenHandler_1.createToken(newUser.id, newUser.tokenVersion);
            tokenHandler_1.sendToken(res, token);
            res.redirect(`${FRONTEND_URI}/dashboard`);
        }
        else {
            token = tokenHandler_1.createToken(user.id, user.tokenVersion);
            tokenHandler_1.sendToken(res, token);
            res.redirect(`${FRONTEND_URI}/dashboard`);
        }
    }
    catch (error) {
        res.redirect(FRONTEND_URI);
    }
};
exports.GoogleAuthenticate = async (req, res) => {
    if (!req.userProfile)
        return;
    const { id, emails, displayName, provider } = req.userProfile;
    try {
        const user = await User_1.UserModel.findOne({ googleId: id });
        let token;
        if (!user) {
            const newUser = await User_1.UserModel.create({
                username: displayName,
                email: (emails && emails[0].value) || provider,
                googleId: id,
                password: provider,
            });
            await newUser.save();
            token = tokenHandler_1.createToken(newUser.id, newUser.tokenVersion);
            tokenHandler_1.sendToken(res, token);
            res.redirect(`${FRONTEND_URI}/dashboard`);
        }
        else {
            token = tokenHandler_1.createToken(user.id, user.tokenVersion);
            tokenHandler_1.sendToken(res, token);
            res.redirect(`${FRONTEND_URI}/dashboard`);
        }
    }
    catch (error) {
        res.redirect(FRONTEND_URI);
    }
};
