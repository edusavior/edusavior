function getModel(req, res, next) {
  let model = req.params.model;
  let md = require(`../lib/models/products/products-model`);
  let mdC = require(`../lib/models/categories/categories-model`);



  console.log('getModel', req.body);


  switch (model) {
  case 'courses':
    req.model = mdC;
    next();
    return;
  case 'products':
    req.model = md;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

module.exports = getModel;