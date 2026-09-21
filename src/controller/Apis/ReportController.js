const Task = require("../../model/task");

class ReportController {
  async taskSummary(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "startDate and endDate are required",
        });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      const summary = await Task.aggregate([
        {
          $match: {
            user: req.user.id,
            dueDate: {
              $gte: start,
              $lte: end,
            },
          },
        },

        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalTasks = 0;
      let completedTasks = 0;
      let pendingTasks = 0;

      summary.forEach((item) => {
        totalTasks += item.count;

        if (item._id === "Completed") {
          completedTasks = item.count;
        }

        if (item._id === "Pending") {
          pendingTasks = item.count;
        }
      });

      return res.status(200).json({
        success: true,
        data: {
          totalTasks,
          completedTasks,
          pendingTasks,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async taskStatistics(req, res) {
    try {
      const statistics = await Task.aggregate([
        {
          $match: {
            user: req.user.id,
          },
        },

        {
          $group: {
            _id: null,

            totalTasks: {
              $sum: 1,
            },

            completedTasks: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$status", "Completed"],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },

        {
          $project: {
            _id: 0,

            totalTasks: 1,

            completedTasks: 1,

            completionRate: {
              $multiply: [
                {
                  $divide: [
                    "$completedTasks",
                    {
                      $cond: [
                        {
                          $eq: ["$totalTasks", 0],
                        },
                        1,
                        "$totalTasks",
                      ],
                    },
                  ],
                },
                100,
              ],
            },
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        data: statistics[0] || {
          totalTasks: 0,
          completedTasks: 0,
          completionRate: 0,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ReportController();
