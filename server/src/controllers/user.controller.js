import User from '../models/user.model.js';

export const getStats = async (req, res) => {
  try {
    // coutns
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: 'Active' });
    const inactive = await User.countDocuments({ status: 'Inactive' });

    // response
    res.json({ total, active, inactive });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};
