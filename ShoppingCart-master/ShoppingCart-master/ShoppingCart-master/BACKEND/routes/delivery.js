const router = require("express").Router();
let Delivery = require("../models/delivery.model");

router.route("/").get((req, res) => {
  Delivery.find()
    .then((deliveries) => res.json(deliveries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const customerName = req.body.customerName;
  const NICNumber = req.body.NICNumber;
  const itemCode = req.body.itemCode;
  const address = req.body.address;
  const deliveryMethod = req.body.deliveryMethod;
  const contactNumber = Number(req.body.contactNumber);
  const date = req.body.date;

  const newDelivery = new Delivery({
    customerName,
    NICNumber,
    itemCode,
    address,
    deliveryMethod,
    contactNumber,
    date,
  });

  newDelivery
    .save()
    .then(() => res.json("1"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/////
router.route("/:id").get((req, res) => {
  Delivery.findById(req.params.id)
    .then((delivery) => res.json(delivery))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Delivery.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Delivery.findById(req.params.id)
    .then((delivery) => {
      delivery.customerName = req.body.customerName;
      delivery.NICNumber = req.body.NICNumber;
      delivery.itemCode = req.body.itemCode;
      delivery.address = req.body.address;
      delivery.deliveryMethod = req.body.deliveryMethod;
      delivery.contactNumber = Number(req.body.contactNumber);
      delivery.date = req.body.date;

      delivery
        .save()
        .then(() => res.json("Delivery updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
