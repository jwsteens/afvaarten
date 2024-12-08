const app = require('./app')
const logger = require('./utils/logger')
require('dotenv').config()

app.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})