module.exports = {
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  bind: {
    ip: {
      doc: "The IP address to bind.",
      format: "ipaddress",
      default: "127.0.0.1",
      env: "IP_ADDRESS",
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 0,
      env: "PORT",
      arg: "port"
    }
  }
}
