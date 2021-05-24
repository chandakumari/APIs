const findUser = query => {
    if (!query) return null;
  
    return {
      username: "chanda",
      password: "password",
      email: "chanda0707@gmail.com",
      address: "Darbhanga,Bihar"
    };
  };
  
  module.exports = {
    findUser
  };