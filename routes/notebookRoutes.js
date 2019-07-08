const express = require('express');
const router = express.Router();
const {Notebook, validate} = require('./../model/Notebook');

router.post('/', async (req, res) => {
  const {error} = validate(req.body);

  if(error) {
    res.status(400).send(error.details[0].message);
  }
  const {name, processor, brand} = req.body;
  let notebook = new Notebook({name, processor, brand});
  notebook = await notebook.save();

  res.send(notebook);
});

router.post('/search', async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for(let key in req.body.filters){
    if(req.body.filters[key].length >0 ){
      if(key === 'price'){
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  // findArgs['publish'] = true;

  Notebook.
  find(findArgs).
  populate('brand').
  populate('processor').
  sort([[sortBy,order]]).
  skip(skip).
  limit(limit).
  exec((err,notebooks)=>{
    if(err) {
      return res.status(400).send(err);
    }
    res.send({
      size: notebooks.length,
      notebooks
    })
  })
});

module.exports = router;
