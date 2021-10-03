"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _blog = _interopRequireDefault(require("./blog"));

var _admin = _interopRequireDefault(require("./admin"));

var _archive = _interopRequireDefault(require("./archive"));

var _property = _interopRequireDefault(require("./property"));

var _propertyUpload = _interopRequireDefault(require("./property-upload"));

var _contact = _interopRequireDefault(require("./contact"));

var _staff = _interopRequireDefault(require("./staff"));

var _newsletter = _interopRequireDefault(require("./newsletter"));

var _subscribers = _interopRequireDefault(require("./subscribers"));

var _mailer = _interopRequireDefault(require("./mailer"));

var _adaptRequest = _interopRequireDefault(require("./helpers/adapt-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cors = require('cors');

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
const port = process.env.PORT || 9090; //Middleware

app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(cors());
app.post('/sendmail', sendmailController);

function sendmailController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _mailer.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/admin', adminController);
app.post('/admin/add', adminController);
app.post('/admin/auth', adminController);
app.post('/admin/reset', adminController);
app.get('/admin/:id', adminController);
app.get('/admin/?email=:email', adminController);

function adminController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _admin.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/archive', archiveController);
app.post('/archive/add', archiveController);
app.get('/archive/:id', archiveController);
app.get('/archive/?id=:id', archiveController);

function archiveController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _archive.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/blog', blogController);
app.post('/blog/add', blogController);
app.get('/blog/:id', blogController);
app.get('/blog/?id=:id', blogController);
app.get('/blog/?min=:min', blogController);

function blogController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _blog.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/property', propertyController);
app.post('/property/add', propertyController);
app.get('/property/:id', propertyController);
app.get('/property/?id=:id', propertyController);
app.get('/property/?min=:min', propertyController);

function propertyController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _property.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
} // app.all('/property_details', propertyDetailsController);
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

function propertyUploadController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _propertyUpload.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/message', messageController);
app.get('/message/:id', messageController);

function messageController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  handleMessageRequest(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/staff', staffController);
app.post('/staff/add', staffController);
app.get('/staff/:id', staffController);
app.get('/staff/?id=:id', staffController);
app.get('/staff/?email=:email', staffController);
app.get('/staff/?department=:department', staffController);

function staffController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _staff.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/newsletter', newsletterController);
app.post('/newsletter/add', newsletterController);
app.get('/newsletter/:id', newsletterController);

function newsletterController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _newsletter.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/contact', contactController);
app.post('/contact/add', contactController);
app.get('/contact/:id', contactController);

function contactController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _contact.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.all('/subscribers', subscribersController);
app.post('/subscribers/add', subscribersController);
app.get('/subscribers/:id', subscribersController);
app.get('/subscribers/?id=:id', subscribersController);
app.get('/subscribers/?estate_name=:estate_name', subscribersController);
app.get('/subscribers/?estate_id=:estate_id', subscribersController);
app.get('/subscribers/?email=:email', subscribersController);

function subscribersController(req, res) {
  const httpRequest = (0, _adaptRequest.default)(req);
  (0, _subscribers.default)(httpRequest).then(({
    headers,
    statusCode,
    data
  }) => res.set(headers).status(statusCode).send(data)).catch(e => res.status(500).end());
}

app.listen(port, () => console.log(`Listening on port 9090` + process.env.PORT || 9090));
//# sourceMappingURL=index.js.map