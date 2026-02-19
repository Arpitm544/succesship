const express = require("express")
const router = express.Router()

const Memory = require("../models/Memory")
const geminiService = require("../services/geminiService")


// save a memory
router.post("/memories", async (req, res) => {
  try {
    const memory = await Memory.create(req.body)
    res.json(memory)
  } catch (err) {
    console.log("error saving memory:", err.message)
    res.status(500).json({ error: "could not save memory" })
  }
})


// get latest memories
router.get("/memories", async (req, res) => {
  try {
    const memories = await Memory.find()
      .sort({ timestamp: -1 })
      .limit(5)

    res.json(memories)
  } catch (err) {
    console.log("error fetching memories:", err.message)
    res.status(500).json({ error: "could not fetch memories" })
  }
})


// query memories + ask gemini
router.post("/query", async (req, res) => {
  try {
    const { query } = req.body

    if (!query) {
      return res.status(400).json({ error: "query is required" })
    }

    // just grab recent memories
    const memories = await Memory.find()
      .sort({ timestamp: -1 })
      .limit(20)

    // pick only relevant ones
    const matches = memories.filter((m) =>
      m.content.toLowerCase().includes(query.toLowerCase())
    )

    const best = matches.slice(0, 5)

    // send context to gemini
    const answer = await geminiService.askGemini(query, best)

    res.json({
      answer,
      context: best,
    })
  } catch (err) {
    console.log("query error:", err.message)
    res.status(500).json({ error: "something went wrong" })
  }
})

module.exports = router