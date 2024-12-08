const departuresRouter = require('express').Router()
const axios = require('axios')

departuresRouter.get('/:date', async (req, res) => {
    const date = req.params.date
    const departures = await getDepartures(new Date(date))
    res.json(departures)
})

const getDepartures = async date => {
    let fromHarlingen, fromTerschelling, availabilityFromHarlingen, availabilityFromTerschelling
    const emptyObject = {fromHarlingen: {departures: []}, fromTerschelling: {departures: []}}

    try {
        const harlingenResponse = await axios.get(`https://api-2021.rederij-doeksen.nl/departures/H/T/${date.toISOString()}`)
        fromHarlingen = harlingenResponse.data
    } catch (err) {
        return emptyObject
    }

    try {
        const terschellingResponse = await axios.get(`https://api-2021.rederij-doeksen.nl/departures/T/H/${date.toISOString()}`)
        fromTerschelling = terschellingResponse.data
    } catch (err) {
        return emptyObject
    }

    try {
        const availabilityHarlingenResponse = await axios.post(`https://api-2021.rederij-doeksen.nl/departures/availability`, fromHarlingen)
        availabilityFromHarlingen = availabilityHarlingenResponse.data
    } catch (err) {
        return emptyObject
    }

    try {
        const availabilityTerschellingResponse = await axios.post(`https://api-2021.rederij-doeksen.nl/departures/availability`, fromTerschelling)
        availabilityFromTerschelling = availabilityTerschellingResponse.data
    } catch (err) {
        return emptyObject
    }

    fromHarlingen.departures =  fromHarlingen.departures.map( departure => {
        const availability = (availabilityFromHarlingen).find(voyage => voyage.departureCode === departure.code)
        departure.persons = availability?.passengers
        departure.meters = availability?.vehicles
        return departure
    })

    fromTerschelling.departures = fromTerschelling.departures.map( departure => {
        const availability = (availabilityFromTerschelling).find(voyage => voyage.departureCode === departure.code)
        departure.persons = availability?.passengers
        departure.meters = availability?.vehicles
        return departure
    })

    return { fromHarlingen, fromTerschelling }
}

module.exports = departuresRouter