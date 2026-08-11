import "dotenv/config"

const env = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    jwt_key: process.env.JWT_SECRET,
}
if (!process.env.PORT) {
    throw new Error("Port Is Not Define In Environment Variable")
} else if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI Is Not Define In Environment Variable")
} else if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET Is Not Define In Environment Variable")
}

export default env