exports.getIPClient = async (req) => {
    const ip = req.connection.remoteAddress;
    const ipV4 = ip.split(":");
    const ipOk = ipV4[ipV4.length - 1];
  
    return ipOk;
  };