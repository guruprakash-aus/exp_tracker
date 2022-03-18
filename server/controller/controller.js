const model = require("../models/model");

// post: http://localhost:8080/api/categories
const createCategories = async (req, res) => {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44", // dark
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
};

// get:  http://localhost:8080/api/categories
const getCategories = async (req, res) => {
  let data = await model.Categories.find({});

  let filter = data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
};

// post:  http://localhost:8080/api/transaction
const createTransaction = async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing in Post");
  let { name, type, amount } = req.body;

  const Create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating Transaction ${err}` });
  });
};

// get:  http://localhost:8080/api/transaction
const getTransaction = async (req, res) => {
  let data = await model.Transaction.find({});

  return res.json(data);
};

// delete: http://localhost:8080/api/transaction
async function deleteTransaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await model.Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
}

// const deleteTransaction = async (req, res) => {
//   if (!req.body)
//     return res.status(400).send("Request body is missing in Delete");
//   //   let { id } = req.body;

//   //   await model.Transaction.findByIdAndDelete(id, function (err) {
//   //     if (!err) return (
//   //         console.log
//   //         res.json({ message: "Transaction Deleted" })
//   //         );
//   //     return res
//   //       .status(400)
//   //       .json({ message: `Error while deleting Transaction ${err}` });
//   //   });

//   await model.Transaction.deleteOne(req.body, function (err) {
//     if (!err)
//       return (
//         console.log(`Transaction Deleted for ${req.body.id}`),
//         res.json("Transaction Record Deleted...!")
//       );
//   }).catch(function (err) {
//       res.json(`Error while deleting Transaction Record ${err}`);
//     });
// };

// get : http://localhost:8080/api/labels
const getLabels = async (req, res) => {
  let data = await model.Transaction.aggregate([
    {
      //key
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categoriesInfo",
      },
    },
    {
      $unwind: "$categoriesInfo",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categoriesInfo.color,
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json(`Lookup Collection Error ${error}`);
    });
};

module.exports = {
  createCategories,
  getCategories,
  createTransaction,
  getTransaction,
  deleteTransaction,
  getLabels,
};
