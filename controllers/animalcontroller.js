const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
let validateJWT = require("../middleware/validate-jwt");

/*KEY:
replace first with second

title to name
date to legNumber
entry to predator
req.body.journal to req.body.animal
journalEntry to animalType
newJournal to newAnimal
JournalModel to Animal
*/

router.post("/create", async (req, res) => {
    const { name, legNumber, predator, } = req.body.animal;
    const { id } = req.user;
    const animalEntry = {
        name,
        legNumber,
        predator,
        userId: id
    };
    try {
        const newAnimal = await Animal.create(animalEntry);
        res.status(201).json({
            message: "Item successfully created",
            name: newAnimal,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to register Submission"});
    }
});

//Get all animals section
router.get("/", validateJWT, async (req, res) => {
    try {
        const animals = await Animal.findAll();
        res.status(201).json(animals);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/delete/:id", validateJWT,  async (req, res) => {
    const animalId = req.params.id;

    try {
        const query = {
            where: {
                id: animalId,
            },
        };
        await Animal.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/update/:animalId", validateJWT, async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    const animalId = req.params.animalId;

    const query = {
        where: {
            id: animalId,
        },
    };

    const newNewAnimal = {
        name: name,
        legNumber: legNumber,
        predator: predator,
        userId: id
        
    };

    try {
        const updatedAnimal = await Animal.update(newNewAnimal, query);
        res.status(200).json({updatedAnimal, message: "Item has been updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;