'use strict';

const express = require('express');
const path = require('path');
var async = require('express-async-await');
var fetch = require('node-fetch');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const songRouter = express.Router();
const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// // API
// app.get('/api', (req, res) => {
//   res.set('Content-Type', 'application/json');
//   let data = {
//     message: 'Hello world, death!!!!'
//   };
//   res.send(JSON.stringify(data, null, 2));
// });

songRouter.route('/songs').get((req, res) => {
  const apiUrl2 = 'https://swapi.co/api/people';

  fetch(apiUrl2, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ start: 0, end: 35 })
  })
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send({ error: 'bad' });
      //	res.redirect('/error');
    });
});
app.use('/api', songRouter);
// app.get('/songs', (req, res) => {
// 	//build api URL with user zip

// 	const apiUrl = 'https://musicdemons.com/api/v1/song';
//    const apiUrl2 = 'https://swapi.co/api/people';

// 	fetch(apiUrl2, {
//      method: 'POST',
//     headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
//     body: JSON.stringify({start: 0, end: 35})
//   })
// 	.then(res => res.json())
// 	.then(data => {
// 		res.send(JSON.stringify(data, null, 2));
// 	})
// 	.catch(err => {
//     console.log('nope', err);
//     res.send({ error: "FUK"});
// 	//	res.redirect('/error');
// 	});

// })

// All remaining requests return the React app, so it can handle routing.
// app.get('*', function(request, response) {
//   response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
// });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
