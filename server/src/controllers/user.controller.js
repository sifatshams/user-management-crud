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
    // get query from req.params
    const query = req.params.query;

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // create search query
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { status: { $regex: query, $options: 'i' } },
      ],
    };

    // find user
    const users = await User.find(searchQuery);

    // total count
    const total = await User.countDocuments(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // success response
    res.status(200).json({
      users,
      currentPage: page,
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

// get single user
export const getUserById = async (req, res) => {
  try {
    // find user & get the id from req.params
    const user = await User.findById(req.params.id);

    // validation
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: 'User not found!' });
    }

    // success response
    res
      .status(200)
      .json({ success: true, message: 'User fetch successfully!', data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};
