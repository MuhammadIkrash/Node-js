import "dotenv/config"

const env = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
}
if (!process.env.PORT) {
    throw new Error("Port Is Not Define In Environment Variable")
} else if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI Is Not Define In Environment Variable")
}

export default env