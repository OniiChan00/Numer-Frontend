const express = require("express");
const router = express.Router();
const math = require("mathjs");




router.post('/api/CramerAPI', (req, res) => {
    var MatrixA = req.body.matrixA;
    var MatrixB = [].concat(...req.body.matrixB);
    var Temp_Ans = [];

    var detA = math.det(MatrixA);
   
    for(var i = 0; i < MatrixA.length; i++){
        var temp = math.clone(MatrixA);
        for(var j = 0; j < MatrixA.length; j++){
            temp[j][i] = MatrixB[j];
        }
        var detAi = math.det(temp);
        
        Temp_Ans.push({
            x: i,
            value: detAi/detA
        });
    }
 
    res.json({
        Temp_Ans: Temp_Ans,
    });
});

module.exports = router;
