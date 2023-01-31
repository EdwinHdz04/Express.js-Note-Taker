const express = require('express');
const routesAPI = require( './Develop/routes/routesAPI');
const routesHtml = require('./Develop/routes/routesHtml');
const app = express();

const PORT =process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', routesAPI);
app.use('/', routesHtml);

app.listen(PORT, () => 
console.log('listening at http://localhost:${PORT}')
);