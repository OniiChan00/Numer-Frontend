const express = require('express');
const router = express.Router();
const math = require('mathjs');

router.post('/api/JacobiAPI', (req, res) => {
    var matrixA = req.body.matrixA;
    var matrixB = [].concat(...req.body.matrixB);
    var matrixC = [].concat(...req.body.matrixC);
    var Temp_Ans = [];

    var n = matrixA.length;
    var x = new Array(n);
    var x0;
    var epsilon = new Array(n);
    do{
        x0 = Json.parse(Json.stringify(x));
        for(var i = 0; i < n; i++){
            var sum = 0;
            for(var j = 0; j < n; j++){
                if(i !== j){
                    sum += matrixA[i][j] * matrixC[j];
                }
            }
            x[i] = (matrixB[i] - sum) / matrixA[i][i];
        }
    }while(error(x,x0));

    function error(x1,x0){
        for(var i = 0; i < x1.length; i++){
            epsilon[i] = Math.abs((x1[i] - x0[i]) / x1[i]);
        }
        for(var i = 0; i < x1.length; i++){
            if(epsilon[i] > 0.000001){
                return true;
            }
        }
        return false;
    }
 
    for(var i = 0; i < n; i++){
        Temp_Ans.push({
            x: i,
            value: x[i]
        });
    }
    res.json({
        Temp_Ans: Temp_Ans,
    });
});

module.exports = router;