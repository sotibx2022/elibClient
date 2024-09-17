const _config = {
PORT:process.env.PORT,
CONNECTION_STRING:process.env.CONNECTION_STRING,
ENV:process.env.ENV,
SECRET_KEY:process.env.SECRET_KEY,
WEBSITE_URL: process.env.WEBSITE_URL
};
export const config = Object.freeze(_config);