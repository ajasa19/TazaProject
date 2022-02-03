//Required for uploading files to blob storage
const { BlobServiceClient } = require('@azure/storage-blob');
const driversLicenseContainer = "drivers-licenses";
const kitchenCertificatesContainer = "kitchen-certificates";

//Required for pushing files from front end to node.js
const FormData = require('form-data');
const multer  = require('multer')

//Required for deleting file from temp server storage
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })

//TODO: Change to get key from secure key storage or ENV variable
const sasToken = "?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacitfx&se=2022-11-12T03:36:32Z&st=2021-11-11T19:36:32Z&spr=https&sig=%2BKz58rStwFsSn2q%2B%2BTYaVC3r%2F6IeoTCGS9MtP0KIHJI%3D";
const storageAccountName = "tazaccsta";

const express = require("express");
//const mysql = require("mysql");
const app = express();
const dobyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var config = require("./../config.js");
var connection = config.connection;

router.get('/getProfile', (req, res) => {
    const id = req.query.profileId;
    connection.query("SELECT * FROM profile WHERE id = ?;", [id],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.get('/getProfileLimited', (req, res) => {
    const userId = req.query.userId;

    var query = connection.query("SELECT userName AS profileUserName, firstName AS profileFirstName, lastName AS profileLastName, phoneNumber AS profilePhoneNum, emailAddress AS profileEmail, profilePicUrl AS profileImgUrl FROM profile WHERE id = ?;", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

router.post('/changeProfileAddress', (req, res) => {
    const id = req.body.profileId;
    const address = req.body.address;
    connection.query("UPDATE profile SET address = ? WHERE id = ?;", [address,id],(err, result) => {
        if (err) throw err;
    });
});

router.get('/getIsKitchen', (req, res) => {
    const id = req.query.profileId;
    if (id === undefined) {
        res.send(JSON.stringify({ isAdmin: false }));
    }
    else {
        connection.query("SELECT accountTypeId FROM profile WHERE id = ?;", [id], (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify({ isAdmin: result[0].accountTypeId === 1 }));
        });
    }

});

router.get('/getIsAdmin', (req, res) => {
    const id = req.query.profileId;
    if(id === undefined){
        res.send(JSON.stringify({ isAdmin: false}));
    }
    else
    {
        connection.query("SELECT accountTypeId FROM profile WHERE id = ?;", [id],(err, result) => {
            if (err) throw err;
            //console.log(JSON.stringify({ isAdmin: result[0].accountTypeId === 3}));
            res.send(JSON.stringify({ isAdmin: result[0].accountTypeId === 3}));
        });
    }
    
});

router.post('/updateDriversLicense', upload.array('file', 12), async(req, res) => {
    const id = req.body.id; // store users id

    //Connect to blob server container / create container if it does not exist
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobService.getContainerClient(driversLicenseContainer);
    const exists = await containerClient.exists();
    if(!exists){
        const createContainerResponse = await containerClient.createIfNotExists({
            access: 'container',
        });
        if(!createContainerResponse.succeeded){
            //console.log("Failed to create container.");
            return;
        }
    }

    //Check if profile alr3eady has driver license files in DB
    await connection.query("SELECT * from driver_documents WHERE driverId = ?;", [id],(err, result) => {
        if (err) throw err;

        if(result.length > 0){
            //Is driver_documents returns rows from that driver id, delete their files
            connection.query("DELETE FROM testtaza.driver_documents WHERE driverId = ?;", [id],(err, result) => {
                if (err) throw err;
            });
        }
    });

    //Upload multiple files to blob storage
    for(const file of req.files){ 
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
        //console.log('\nUploading to Azure storage as blob: \t', file.originalname);

        const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
        //console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

        //Update users driver documents in DB
        connection.query("INSERT INTO driver_documents (driverId, URL) VALUES (?, ?)", [id, blockBlobClient.url],(err, result) => {
            if (err) throw err;
        });

        //Delete file from local upload storage 
        await unlinkAsync(file.path);
    }

    res.sendStatus(200);
});

router.post('/updateToDriver', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const accountTypeId = 2;
    const status = "PENDING";

    connection.query("UPDATE profile SET firstName = ?, lastName = ?, phoneNumber = ?, accountTypeId = ?, status = ? WHERE id = ?;", [firstName, lastName, phoneNumber, accountTypeId, status, id],(err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.post('/updateToChef', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const accountTypeId = 3;

    connection.query("UPDATE profile SET firstName = ?, lastName = ?, phoneNumber = ?, accountTypeId = ? WHERE id = ?;", [firstName, lastName, phoneNumber, accountTypeId, id],(err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.post('/updateDriverStatus', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    connection.query("UPDATE profile SET status = ? WHERE id = ?;", [status, id],(err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.get('/getDriverDocuments', (req, res) => {
    const id = req.query.id;
    
    connection.query("SELECT * FROM driver_documents WHERE driverId = ?;", [id],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

module.exports = router;