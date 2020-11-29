import { Router } from 'express';
import fbDatabaseRef from '/config/firebase';

const router = Router();
const MAX_ENTRIES = 1000;

// save data to firebase also remove old entries
router.post('/house-conditions', async (req, res, next) => {
  const { temperature, humidity } = req.body;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  try {
    const entry = await fbDatabaseRef.once('value');
    const count = entry.numChildren();

    if (count > MAX_ENTRIES) {
      const updates = {};
      entry.forEach((child) => (updates[child.key] = null));
      fbDatabaseRef.update(updates);
    }

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
