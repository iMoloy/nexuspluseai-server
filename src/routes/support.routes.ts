import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/v1/support/contact - Public contact support ticket route
router.post('/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
      return;
    }

    // Return successful support ticket response
    res.status(200).json({
      success: true,
      message: `Thank you, ${name}! Your support ticket has been received by NexusPulse AI Team.`,
      data: {
        ticketId: `TICK_${Date.now().toString().slice(-6)}`,
        email,
        subject: subject || 'General Query',
        status: 'OPEN'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact message'
    });
  }
});

export default router;
