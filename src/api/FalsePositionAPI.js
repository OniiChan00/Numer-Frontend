const express = require("express");
const router = express.Router();
const math = require("mathjs");

/**
 * @swagger
 *  tags:
 *   name: FalsePositionAPI
 *   description: Get all books
 * 
 */

/**
 * @swagger
 * /api/FalsePositionAPI:
 *   get:
 *     tags: [FalsePositionAPI]
 *     responses:
 *       201:
 *         description: GET
 */

 /**
 * @swagger
 * /api/FalsePositionAPI:
 *   post:
 *     parameters:
 *      - name: equation
 *      - name: xl
 *      - name: xr
 *     tags: [FalsePositionAPI]
 *     responses:
 *       201:
 *         description: post data
 */





router.post("/api/FalsePositionAPI", (req, res) => {
    var equation = math.compile(req.body.equation);
    var xl = parseFloat(req.body.xl);
    var xr = parseFloat(req.body.xr);
    var xm = 0;
    var n = 0;
    var check;
    var temp_Ans = [];

    const findxm = (xl, xr) => {
        return((parseFloat(xl) * equation.evaluate({x: xr}) - parseFloat(xr) * equation.evaluate({x: xl})) / (equation.evaluate({x: xr}) - equation.evaluate({x: xl})));
    };

    do {
        xm = findxm(xl, xr);
        n++;
        temp_Ans.push({
            iteration: n,
            xl: xl,
            xr: xr,
            xm: xm,
            Error: check
        });
        if (equation.evaluate({x: xm}) > 0) {
            check = math.abs((xm - xr) / xm).toFixed(6);
            xr = xm;
        } else if (equation.evaluate({x: xm}) < 0) {
            check = math.abs((xm - xl) / xm).toFixed(6);
            xl = xm;
        } else {
            check = 0;
        }
        
    } while (check > 0.000001 && n < 10000);
    console.log(temp_Ans);
    res.json({temp_Ans: temp_Ans});
});
module.exports = router;
