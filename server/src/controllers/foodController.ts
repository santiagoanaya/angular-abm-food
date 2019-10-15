import { Request, Response } from 'express';


import pool from '../database';

class FoodController {

    public async list(req: Request, res: Response): Promise<void> {
        const food = await pool.query('SELECT * FROM food');
        res.json(food);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const food = await pool.query('SELECT * FROM food WHERE id = ?', [id]);
        console.log(food.length);
        if (food.length > 0) {
            return res.json(food[0]);
        }
        res.status(404).json({ text: "The food doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO food set ?', [req.body]);
        res.json({ message: 'Food Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldFood = req.body;
        await pool.query('UPDATE food set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The food was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM food WHERE id = ?', [id]);
        res.json({ message: "The food was deleted" });
    }
}

const foodController = new FoodController;
export default foodController;