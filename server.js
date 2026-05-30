import 'dotenv/config'
import express from 'express'
import connectDb from './src/config/db.js';
import app from './src/app.js';
import dns from 'dns';


// Force IPv4 + Google DNS in db.js
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

connectDb();

const port=process.env.PORT;

app.listen(port, () => {
    console.log("Server is running on port 3000");
});