const express = require('express')
var jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config();


const MemberAuth = (req, res, next) => {
    const token = req.header('auth-token')
    console.log(token,50);
    if (!token) {
        return res.status(401).send({ error: "please authenticate using a valid token" })
    }
    else {
        try {
            const member = jwt.verify(token, process.env.JWT_SECRET);
            console.log(member, 11222)
            req.member = member;
            next();
        }
        catch (err) {
            return res.status(401).send({ error: "catch: please authenticate using a valid token" })
        }
    }
}

module.exports = MemberAuth