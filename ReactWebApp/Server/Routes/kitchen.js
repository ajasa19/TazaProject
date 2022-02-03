//Required for uploading files to blob storage
const { BlobServiceClient } = require('@azure/storage-blob');
const driversLicenseContainer = "drivers-licenses";
const kitchenCertificatesContainer = "kitchen-certificates";
const kitchenImagesContainer = "kitchen-images";

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
const dobyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var config = require("./../config.js");
var connection = config.connection;

router.get('/getKitchens', (req, res) => {
    //console.log("JSON.stringify(userId) " +JSON.stringify(req));
    connection.query("SELECT * FROM kitchen;", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log("JSON.stringify(result) " +JSON.stringify(result));
    });
});

router.get('/getKitchen', (req, res) => {
    const kitchenId = req.query.Id;
    //console.log("JSON.stringify(kitchenId) " +JSON.stringify(kitchenId));
    connection.query("SELECT * FROM kitchen WHERE id = ?;", [kitchenId],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log("JSON.stringify(result) " +JSON.stringify(result));
    });
});

router.get('/getKitchenByUser', (req, res) => {
    const profileId = req.query.id;
    //console.log("JSON.stringify(profileId) " +JSON.stringify(profileId));
    connection.query("SELECT * FROM kitchen WHERE userId = ?;", [profileId],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log("JSON.stringify(result) " +JSON.stringify(result));
    });
});

router.get('/getFoodItems', (req, res) => {
    const kitchenId = req.query.Id;
    connection.query("SELECT food_items.id AS id, food_items.name , food_items.description, food_items.ingredients, CONCAT(FORMAT(food_items.price, 2)) AS price, food_items.imageURL, category.id AS categoryId, category.name AS categoryName FROM food_item_category JOIN food_items ON food_items.id = food_item_category.foodItemId JOIN category ON category.id = food_item_category.categoryId WHERE food_items.kitchenId = ?;", [kitchenId],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log("JSON.stringify(result) " +JSON.stringify(result));
    });
});

router.post('/createKitchen', upload.array('file', 1), async(req, res) => {
    const userId = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const status = "PENDING";

    //Remove existing kitchens created by user
    // connection.query("SELECT * FROM kitchen WHERE userId = ?", [userId],(err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0){
    //         connection.query("DELETE FROM kitchen WHERE userId = ?", [userId],(err, result) => {
    //             if (err) throw err;
    //         });
    //     }
    // });

    //Connect to blob server container / create container if it does not exist
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobService.getContainerClient(kitchenImagesContainer);
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
    const file = req.files[0];
    const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
    //console.log('\nUploading to Azure storage as blob: \t', file.originalname);

    const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
    //console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

    //Delete file from local upload storage 
    await unlinkAsync(file.path);

    connection.query("INSERT INTO kitchen (userId, name, description, location, status, imageURL) VALUE (?, ?, ?, ?, ?, ?)", [userId, name, description, location, status, blockBlobClient.url],(err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.post('/updateKitchenCertification', upload.array('file', 2), async(req, res) => {
    const id = req.body.id; // store kitchen id

    //Connect to blob server container / create container if it does not exist
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobService.getContainerClient(kitchenCertificatesContainer);
    const exists = await containerClient.exists();
    if(!exists){
        const createContainerResponse = await containerClient.createIfNotExists({
            access: 'container',
        });
        if(!createContainerResponse.succeeded){
            //("Failed to create container.");
            return;
        }
    }

    //Check if profile alr3eady has driver license files in DB
    await connection.query("SELECT * from kitchen_documents WHERE kitchenId = ?;", [id],(err, result) => {
        if (err) throw err;

        if(result.length > 0){
            //Is driver_documents returns rows from that driver id, delete their files
            connection.query("DELETE FROM kitchen_documents WHERE kitchenId = ?;", [id],(err, result) => {
                if (err) throw err;
            });
        }
    });

    //Upload multiple files to blob storage
    for(const file of req.files){ 
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
        //('\nUploading to Azure storage as blob: \t', file.originalname);

        const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
        //console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

        //Update users driver documents in DB
        connection.query("INSERT INTO kitchen_documents (kitchenId, URL) VALUES (?, ?)", [id, blockBlobClient.url],(err, result) => {
            if (err) throw err;
        });

        //Delete file from local upload storage 
        await unlinkAsync(file.path);
    }

    res.sendStatus(200);
});

router.post('/updateKitchenStatus', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    connection.query("UPDATE kitchen SET status = ? WHERE id = ?;", [status, id],(err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.get('/getKitchenDocuments', (req, res) => {
    const id = req.query.id;
    
    connection.query("SELECT * FROM kitchen_documents WHERE kitchenId = ?;", [id],(err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

module.exports = router; // get cart methods