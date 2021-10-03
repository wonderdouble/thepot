import express from 'express'
import bodyParser from 'body-parser'
import handleBlogRequest from './blog'
import handleAdminRequest from './admin'
import handleArchiveRequest from './archive'

import handlePropertyRequest from './property'
import handlePropertyUploadRequest from './property-upload'
import handleContactRequest from './contact'
import handleStaffRequest from './staff'
import handleNewsletterRequest from './newsletter'
import handleSubscribersRequest from './subscribers'
import handleSendmailRequest from './mailer'

import adaptRequest from './helpers/adapt-request'

var cors = require('cors')
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 9090;

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

app.post('/sendmail', sendmailController);

function sendmailController (req, res) {
  const httpRequest = adaptRequest(req)
  handleSendmailRequest(httpRequest)
      .then(({ headers, statusCode, data }) =>
      res
          .set(headers)
          .status(statusCode) 
          .send(data)
      )
      .catch(e => res.status(500).end())
}

app.all('/admin', adminController);
app.post('/admin/add', adminController);
app.post('/admin/auth', adminController);
app.post('/admin/reset', adminController);
app.get('/admin/:id', adminController);
app.get('/admin/?email=:email', adminController);

function adminController (req, res) {
  const httpRequest = adaptRequest(req)
  handleAdminRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
    res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.all('/archive', archiveController);
app.post('/archive/add', archiveController);
app.get('/archive/:id', archiveController);
app.get('/archive/?id=:id', archiveController);

function archiveController (req, res) {
    const httpRequest = adaptRequest(req)
    handleArchiveRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
        res
            .set(headers)
            .status(statusCode) 
            .send(data)
        )
        .catch(e => res.status(500).end())
}

app.all('/blog', blogController);
app.post('/blog/add', blogController);
app.get('/blog/:id', blogController);
app.get('/blog/?id=:id', blogController);
app.get('/blog/?min=:min', blogController);

function blogController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleBlogRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/property', propertyController);
app.post('/property/add', propertyController);
app.get('/property/:id', propertyController);
app.get('/property/?id=:id', propertyController);
app.get('/property/?min=:min', propertyController);

function propertyController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handlePropertyRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

// app.all('/property_details', propertyDetailsController);
// app.get('/property_details/:id', propertyDetailsController);

// function propertyDetailsController (req, res) {
  
//   const httpRequest = adaptRequest(req)
//   handlePropertyDetailsRequest(httpRequest)
//     .then(({ headers, statusCode, data }) =>
//       res
//         .set(headers)
//         .status(statusCode) 
//         .send(data)
//     )
//     .catch(e => res.status(500).end())
// }

app.all('/property-upload', propertyUploadController);
app.post('/property-upload/add', propertyUploadController);
app.get('/property-upload/:id', propertyUploadController);
app.get('/property-upload/?id=:id', propertyUploadController);
app.get('/property-upload/?property_id=:property_id', propertyUploadController);

function propertyUploadController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handlePropertyUploadRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/message', messageController);
app.get('/message/:id', messageController);

function messageController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleMessageRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/staff', staffController);
app.post('/staff/add', staffController);
app.get('/staff/:id', staffController);
app.get('/staff/?id=:id', staffController);
app.get('/staff/?email=:email', staffController);
app.get('/staff/?department=:department', staffController);

function staffController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleStaffRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/newsletter', newsletterController);
app.post('/newsletter/add', newsletterController);
app.get('/newsletter/:id', newsletterController);

function newsletterController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleNewsletterRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/contact', contactController);
app.post('/contact/add', contactController);
app.get('/contact/:id', contactController);

function contactController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleContactRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}

app.all('/subscribers', subscribersController);
app.post('/subscribers/add', subscribersController);
app.get('/subscribers/:id', subscribersController);
app.get('/subscribers/?id=:id', subscribersController);
app.get('/subscribers/?estate_name=:estate_name', subscribersController);
app.get('/subscribers/?estate_id=:estate_id', subscribersController);
app.get('/subscribers/?email=:email', subscribersController)


function subscribersController (req, res) {
  
  const httpRequest = adaptRequest(req)
  handleSubscribersRequest(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode) 
        .send(data)
    )
    .catch(e => res.status(500).end())
}


app.listen(port, () => console.log(`Listening on port 9090`+process.env.PORT || 9090));



