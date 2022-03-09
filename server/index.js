const express = require('express');
const axios = require('axios');
const path = require('path');
const API_KEY = require('./config');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gets the first 5 products
app.get('/api/products', (req, res) => {
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get product questions
app.get('/api/product/questions', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${req.query.product_id}&count=100`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get product answers
app.get('/api/product/questions/answers', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.question_id}/answers?count=100`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// post a new question
app.post('/api/product/questions', (req, res) => {
  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
    headers: { Authorization: API_KEY },
    data: req.body,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});

// post a new answer
app.post('/api/product/questions/answers', (req, res) => {
  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.question_id}/answers`,
    headers: { Authorization: API_KEY },
    data: req.body,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});
// report a question
app.put('/api/product/questions/report', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.question_id}/report`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});
// report an answer
app.put('/api/product/questions/answers/report', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.query.answer_id}/report`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get reviews for specific product
app.get('/api/product/reviews', (req, res) => {
  axios({
    method: 'get',
    url: `https://34.239.113.132/reviews/?product_id=${req.query.product_id}`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get reviews meta-data for specific product
app.get('/api/product/reviews/meta', (req, res) => {
  axios({
    method: 'get',
    url: `https://34.239.113.132/reviews/meta/?product_id=${req.query.product_id}`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// increase helpful count of question
app.put('/api/product/questions/helpful', (req, res) => {
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.query.question_id}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});

// increase helpful count of answer
app.put('/api/product/questions/answers/helpful', (req, res) => {
  console.log('helpful answer id', req.query.answer_id);
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.query.answer_id}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => {
      console.log('success');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get product styles
app.get('/api/product/styles', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.product_id}/styles`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get one product
app.get('/api/product', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.product_id}`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get related products
app.get('/api/product/related', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.product_id}/related`,
    headers: { Authorization: API_KEY },
  })
    .then((results) => {
      res.send(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// add product to the users cart
app.post('/api/cart', (req, res) => {
  axios({
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
    headers: { Authorization: API_KEY },
    data: req.body,
  })
    .then(() => {
      console.log('success');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/dist/'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
