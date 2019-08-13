const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(400).json({ message: "Unable to fetch cars from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id: id })
    .then(car => {
      if (car[0]) {
        res.status(200).json(car[0]);
      } else {
        res.status(404).json({ message: "Car does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching car from database" });
    });
});

router.post("/", (req, res) => {
  const newCar = req.body;

  if (!newCar.VIN || newCar.VIN.length < 17 || newCar.VIN.length > 17) {
    return res.status(404).json({ message: "Please enter valid VIN number" });
  }
  if (!newCar.make) {
    return res.status(404).json({ message: "Please add make of car" });
  }
  if (!newCar.model) {
    return res.status(404).json({ message: "Please add model of car" });
  }
  if (!newCar.mileage) {
    return res.status(404).json({ message: "Please add mileage of car" });
  }
  db("cars")
    .insert(newCar, "id")
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to add car to database" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id: id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: " Car has been deleted" });
      } else {
        res.status(404).json({ message: "Car does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to delete from database" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("cars")
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(500).json({ message: " Car not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to update car in database" });
    });
});
module.exports = router;
