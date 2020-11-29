import { Router } from 'express';
import fbDatabaseRef from '/config/firebase';

const router = Router();

// save data to db
router.post('/house-conditions', async (req, res, next) => {
  const { temperature, humidity } = req.body;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  try {
    // const newEntry = fbDatabaseRef.push();
    // newEntry.set({
    //   temperature,
    //   humidity,
    //   timestamp,
    // });
    const entry = await fbDatabaseRef.once('value');
    const entryData = entry.val();
    console.log(entryData);
    if (!entryData) {
      const newEntry = fbDatabaseRef.push();
      newEntry.set({
        temperature,
        humidity,
        timestamp,
      });
    } else {
      const [key] = Object.keys(entryData);
      console.log(key);
      fbDatabaseRef.child(key).update({ temperature, humidity, timestamp });
    }
  } catch (error) {
    console.log('log', error);
  }
  res.status(200).json({ success: true });
});

export default router;
