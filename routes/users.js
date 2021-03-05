import { Router } from 'express';
import { getUser, getUsers, postUser } from '../controllers';

const router = Router();

/* GET home page. */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rest = await getUser({ login: id });
    res.json(rest);
  } catch (error) {
    res.send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const rest = await getUsers();
    res.render('usuarios', { users: rest });
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { query } = req;
    const rest = await postUser(query);
    res.json(rest);
  } catch (error) {
    res.send(error.message);
  }
});

export default router;
