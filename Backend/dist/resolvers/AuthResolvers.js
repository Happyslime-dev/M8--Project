"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolvers = exports.ResponseMessage = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../entities/User");
const validate_1 = require("../utils/validate");
const tokenHandler_1 = require("../utils/tokenHandler");
const authHandler_1 = require("../utils/authHandler");
const types_1 = require("../types");
let ResponseMessage = (() => {
    let ResponseMessage = class ResponseMessage {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ResponseMessage.prototype, "message", void 0);
    ResponseMessage = __decorate([
        type_graphql_1.ObjectType()
    ], ResponseMessage);
    return ResponseMessage;
})();
exports.ResponseMessage = ResponseMessage;
let AuthResolvers = (() => {
    let AuthResolvers = class AuthResolvers {
        async users({ req }) {
            try {
                const user = await authHandler_1.isAuthenticated(req);
                const isAuthorized = user.roles.includes(types_1.RoleOptions.superAdmin) ||
                    user.roles.includes(types_1.RoleOptions.admin);
                if (!isAuthorized)
                    throw new Error('No Authorization.');
                return User_1.UserModel.find().sort({ createdAt: 'desc' });
            }
            catch (error) {
                throw error;
            }
        }
        async me({ req }) {
            try {
                const user = await authHandler_1.isAuthenticated(req);
                return user;
            }
            catch (error) {
                throw error;
            }
        }
        async signup(username, email, password, { res }) {
            try {
                if (!username)
                    throw new Error('Username is required.');
                if (!email)
                    throw new Error('Email is required.');
                if (!password)
                    throw new Error('Password is required.');
                const user = await User_1.UserModel.findOne({ email });
                if (user)
                    throw new Error('Email already in use, please sign in instead.');
                const isUsernameValid = validate_1.validateUsername(username);
                if (!isUsernameValid)
                    throw new Error('Username must be between 3 - 60 characters.');
                const isEmailValid = validate_1.validateEmail(email);
                if (!isEmailValid)
                    throw new Error('Email is invalid.');
                const isPasswordValid = validate_1.validatePassword(password);
                if (!isPasswordValid)
                    throw new Error('Password must be between 6 - 50 characters.');
                const hashedPassword = await bcryptjs_1.default.hash(password, 10);
                const newUser = await User_1.UserModel.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                await newUser.save();
                const token = tokenHandler_1.createToken(newUser.id, newUser.tokenVersion);
                tokenHandler_1.sendToken(res, token);
                return newUser;
            }
            catch (error) {
                throw error;
            }
        }
        async signin(email, password, { res }) {
            try {
                if (!email)
                    throw new Error('Email is required.');
                if (!password)
                    throw new Error('Password is required.');
                const user = await User_1.UserModel.findOne({ email });
                if (!user)
                    throw new Error('Email not found.');
                const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid)
                    throw new Error('Email or password is invalid');
                const token = tokenHandler_1.createToken(user.id, user.tokenVersion);
                tokenHandler_1.sendToken(res, token);
                return user;
            }
            catch (error) {
                throw error;
            }
        }
        async signout({ req, res }) {
            try {
                const user = await User_1.UserModel.findById(req.userId);
                if (!user)
                    return null;
                user.tokenVersion = user.tokenVersion + 1;
                await user.save();
                res.clearCookie(process.env.COOKIE_NAME);
                return { message: 'Goodbye' };
            }
            catch (error) {
                throw error;
            }
        }
        async updateRoles(newRoles, userId, { req }) {
            try {
                const admin = await authHandler_1.isAuthenticated(req);
                const isSuperAdmin = admin.roles.includes(types_1.RoleOptions.superAdmin);
                if (!isSuperAdmin)
                    throw new Error('Not authorized.');
                const user = await User_1.UserModel.findById(userId);
                if (!user)
                    throw new Error('User not found.');
                user.roles = newRoles;
                await user.save();
                return user;
            }
            catch (error) {
                throw error;
            }
        }
        async deleteUser(userId, { req }) {
            try {
                const admin = await authHandler_1.isAuthenticated(req);
                const isSuperAdmin = admin.roles.includes(types_1.RoleOptions.superAdmin);
                if (!isSuperAdmin)
                    throw new Error('Not authorized.');
                const user = await User_1.UserModel.findByIdAndDelete(userId);
                if (!user)
                    throw new Error('Sorry, cannot proceed.');
                return { message: `User id: ${userId} has been deleted.` };
            }
            catch (error) {
                throw error;
            }
        }
    };
    __decorate([
        type_graphql_1.Query(() => [User_1.User], { nullable: 'items' }),
        __param(0, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "users", null);
    __decorate([
        type_graphql_1.Query(() => User_1.User, { nullable: true }),
        __param(0, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "me", null);
    __decorate([
        type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
        __param(0, type_graphql_1.Arg('username')),
        __param(1, type_graphql_1.Arg('email')),
        __param(2, type_graphql_1.Arg('password')),
        __param(3, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "signup", null);
    __decorate([
        type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
        __param(0, type_graphql_1.Arg('email')),
        __param(1, type_graphql_1.Arg('password')),
        __param(2, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "signin", null);
    __decorate([
        type_graphql_1.Mutation(() => ResponseMessage, { nullable: true }),
        __param(0, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "signout", null);
    __decorate([
        type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
        __param(0, type_graphql_1.Arg('newRoles', () => [String])),
        __param(1, type_graphql_1.Arg('userId')),
        __param(2, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String, Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "updateRoles", null);
    __decorate([
        type_graphql_1.Mutation(() => ResponseMessage, { nullable: true }),
        __param(0, type_graphql_1.Arg('userId')),
        __param(1, type_graphql_1.Ctx()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "deleteUser", null);
    AuthResolvers = __decorate([
        type_graphql_1.Resolver()
    ], AuthResolvers);
    return AuthResolvers;
})();
exports.AuthResolvers = AuthResolvers;
