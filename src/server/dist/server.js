"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require('path');
require('dotenv').config();
//CONFIG
var app = express();
app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes config
var demoRoutes = require('./routes/demo.js');
app.use('/demo', demoRoutes);
//SERVER
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
}
app.listen(app.get('port'), function () {
    console.log("Express server is listening on: " + app.get('port'));
});
//# sourceMappingURL=server.js.map