import { Router } from 'express';
import {
  getContaApagar,
  getContasApagar,
  postContaApagar,
} from '../controllers';

const router = Router();

/* GET home page. */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rest = await getContaApagar({ _id: id });
    res.json(rest);
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const rest = await getContasApagar();
    res.render('finances', { finances: rest });
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const rest = await postContaApagar(body);
    res.render('financeResult', { restFinance: rest });
  } catch (error) {
    res.send(error.message);
  }
});

export default router;
