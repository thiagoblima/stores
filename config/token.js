 /**
   * @function: getToken()
   * @param: headers
   * @prop: authorization
   * @description: getting headers for JWT token
   */

  module.exports = getToken = headers => {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };