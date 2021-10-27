"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateEmail = exports.validateUsername = void 0;
exports.validateUsername = (username) => {
    const fmtUsername = username.trim();
    return fmtUsername.length >= 3 && fmtUsername.length <= 60;
};
exports.validateEmail = (email) => {
    const fmtEmail = email.trim().toLowerCase();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(fmtEmail);
};
exports.validatePassword = (password) => password.length >= 6 && password.length <= 50;
