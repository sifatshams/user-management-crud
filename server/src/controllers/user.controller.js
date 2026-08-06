import User from '../models/user.model.js';

// get stats
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

// search users
export const searchUser = async (req, res) => {
  try {
    // get query by req params
    const query = req.params.query;

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // search query
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { status: { $regex: query, $options: 'i' } },
      ],
    };

    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // total
    const total = await User.countDocuments(searchQuery);

    // success response
    res.json({
      users,
      currenPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};
