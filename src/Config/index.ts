export interface Config {
  AUTH_SOCKET_ENDPOINT: string
  AUTH_SERVER_ENDPOINT: string
  PORTFOLIO_SERVER_ENDPOINT: string
  PHOTOGRAPHY_SERVER_ENDPOINT: string
}

export let config: Config = {
  AUTH_SOCKET_ENDPOINT: "http://localhost:6004",
  AUTH_SERVER_ENDPOINT: "http://localhost:6001",
  PORTFOLIO_SERVER_ENDPOINT: "http://localhost:6002",
  PHOTOGRAPHY_SERVER_ENDPOINT: "http://localhost:6003"
}

if (process.env.NODE_ENV === "production") {
  config.AUTH_SOCKET_ENDPOINT = "https://auth-socket.api.mohammad.dev"
  config.AUTH_SERVER_ENDPOINT = "https://auth.api.mohammad.dev"
  config.PORTFOLIO_SERVER_ENDPOINT = "https://portfolio.api.mohammad.dev"
  config.PHOTOGRAPHY_SERVER_ENDPOINT = "https://photography.api.mohammad.dev"
} else {
  config.AUTH_SOCKET_ENDPOINT = "http://localhost:6004"
  config.AUTH_SERVER_ENDPOINT = "http://localhost:6001"
  config.PORTFOLIO_SERVER_ENDPOINT = "http://localhost:6002"
  config.PHOTOGRAPHY_SERVER_ENDPOINT = "http://localhost:6003"
}
