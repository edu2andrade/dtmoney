import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { createServer, Model } from 'miragejs';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1, 
          title: 'Website freelancer',
          type: 'deposit',
          category: 'dev',
          amount: 1497,
          createdAt: new Date('2022-01-13 11:32:00'),
        },
        {
          id: 2, 
          title: 'Internet provider',
          type: 'withdraw',
          category: 'house',
          amount: 62,
          createdAt: new Date('2022-01-13 11:58:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
