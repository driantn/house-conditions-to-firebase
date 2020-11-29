import { Router } from 'express';
import fbDatabaseRef from '/config/firebase';

const router = Router();

// save data to db
router.post('/house-conditions', async (req, res, next) => {
  const { temperature, humidity } = req.body;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  console.log(temperature, humidity, timestamp);
  try {
    const newEntry = fbDatabaseRef.push();
    newEntry.set({
      temperature,
      humidity,
      timestamp,
    });
  } catch (error) {
    console.log('log', error);
  }
  res.status(200).json({ success: true });
});

export default router;
