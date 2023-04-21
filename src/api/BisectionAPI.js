const express = require("express");
const router = express.Router();
const math = require("mathjs");

/**
 * @swagger
 *  tags:
 *   name: BisectionAPI
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/BisectionAPI:
 *   get:
 *     tags: [BisectionAPI]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/BisectionAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [BisectionAPI]
 *     responses:
 *       201:
 *         description: post data
 */


router.post("/api/BisectionAPI", (req, res) => {
  var eq = math.compile(req.body.equation);
  var xl = parseFloat(req.body.xl);
  var xr = parseFloat(req.body.xr);
  var xm = 0;
  var n = 0;
  var check;
  var Temp_Ans = [];

  const findxm = (xl, xr) => {
    return (parseFloat(xl) + parseFloat(xr)) / 2;
  };

  do {
    xm = findxm(xl, xr);
    n++;

    Temp_Ans.push({
      iteration: n,
      xl: xl,
      xm: xm,
      xr: xr,
      Error: check,
    });

    if (eq.evaluate({x:xm}) > 0) {
      check = Math.abs((xm - xr) / xm).toFixed(8);
      xr = xm;
    } else {
      check = Math.abs((xm - xl) / xm).toFixed(8);
      xl = xm;
    }
  } while (check > 0.000001 && n < 100);

  res.json({
    Temp_Ans: Temp_Ans,
  });
});
module.exports = router;