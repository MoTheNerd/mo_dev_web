export interface Config {
  AUTH_SERVER_ENDPOINT: string
  PORTFOLIO_SERVER_ENDPOINT: string
  PHOTOGRAPHY_SERVER_ENDPOINT: string
}

export let config: Config = {
  AUTH_SERVER_ENDPOINT: "http://localhost:6001",
  PORTFOLIO_SERVER_ENDPOINT: "http://localhost:6002",
  PHOTOGRAPHY_SERVER_ENDPOINT: "http://localhost:6003"
}

if (process.env.NODE_ENV === "production") {
  config.AUTH_SERVER_ENDPOINT = "https://api.mohammad.dev/auth"
  config.PORTFOLIO_SERVER_ENDPOINT = "https://api.mohammad.dev/portfolio"
  config.PHOTOGRAPHY_SERVER_ENDPOINT = "https://api.mohammad.dev/photograph"
} else {
  config.AUTH_SERVER_ENDPOINT = "https://localhost:5001/auth"
  config.PORTFOLIO_SERVER_ENDPOINT = "https://localhost:5001/portfolio"
  config.PHOTOGRAPHY_SERVER_ENDPOINT = "https://localhost:5001/photograph"
}
