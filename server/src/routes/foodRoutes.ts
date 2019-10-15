import express, { Router } from 'express';

import foodController from '../controllers/foodController';

class FoodRoutes {

  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', (req, res) => res.send('Food'));

    this.router.get('/', foodController.list);
    this.router.get('/:id', foodController.getOne);
    this.router.post('/', foodController.create);
    this.router.put('/:id', foodController.update);
    this.router.delete('/:id', foodController.delete);
  }
}

export default new FoodRoutes().router;