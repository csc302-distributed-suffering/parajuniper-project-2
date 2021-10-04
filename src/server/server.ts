import * as express from 'express';
const path = require('path')


require('dotenv').config()

//CONFIG
const app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


//routes config
const demoRoutes = require('./routes/demo.js')
app.use('/demo', demoRoutes)


//SERVER
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')));
}

app.listen(app.get('port'), () => {
    console.log(`Express server is listening on: ${app.get('port')}`)
});



