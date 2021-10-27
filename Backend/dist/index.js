"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const createServer_1 = __importDefault(require("./createServer"));
const passport_2 = require("./passport");
const socialMediaAuth_1 = require("./passport/socialMediaAuth");
const { PORT, DB_USER, DB_PASSWORD, DB_ENDPOINT, DB_NAME, FACEBOOK_CALLBACK_ROUTE, GOOGLE_CALLBACK_ROUTE, FRONTEND_URI, } = process.env;
passport_2.PassportFB();
passport_2.PassportGoogle();
const startServer = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        const app = express_1.default();
        app.use(cookie_parser_1.default());
        app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
        app.get(FACEBOOK_CALLBACK_ROUTE, passport_1.default.authenticate('facebook', {
            session: false,
            failureRedirect: FRONTEND_URI,
            scope: ['profile', 'email'],
        }), socialMediaAuth_1.FBAuthenticate);
        app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
        app.get(GOOGLE_CALLBACK_ROUTE, passport_1.default.authenticate('google', {
            session: false,
            failureRedirect: FRONTEND_URI,
        }), socialMediaAuth_1.GoogleAuthenticate);
        const server = await createServer_1.default();
        server.applyMiddleware({ app });
        app.listen({ port: PORT }, () => console.log(`Server is ready at http://localhost:${PORT}${server.graphqlPath}`));
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
