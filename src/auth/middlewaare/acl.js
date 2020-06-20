module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        res.json({error : 'Access Denied'});
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};
    