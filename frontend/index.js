var mysql = require('mysql');
const uuidv4 = require('uuid/v4');
const express = require('express');


const app = express();


bodyParser = require('body-parser'),
    //require the path nodejs module
    path = require("path");


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));



app.post('/api/light', function(req, res){
    var connection = mysqlCreateConnection();

    console.log(req.body);
    var ligthInfo = JSON.parse(JSON.stringify(req.body));

    var  ligthId=ligthInfo.monument_id;
    var  monumentId=ligthInfo.monument_id;

    var  on_off=ligthInfo.motion;
    var  time_on=req.body.time_on;


    connection.connect(function (err) {
        if (err) throw err;
    });


    connection.query("SELECT * FROM ligth WHERE ligthId="+ligthId+";",
        function (err, result, fields) {
            if (err) throw err;
            
            if(!result.length)
            {
                insertLigth(ligthId,monumentId);
            }
            
        }
    );

    connection.query("UPDATE ligth SET on_off="+on_off+",time_on="+time_on+" WHERE ligthId="+ligthId+";",function (err, result, fields) {
        if (err) throw err;
      
    }
);

    connection.end();
});


app.get('/monuments', (req, res) => {
       
    var connection = mysqlCreateConnection();

    connection.connect(function (err) {
        if (err) throw err;
    });
    connection.query("SELECT * FROM monuments;",
        function (err, result, fields) {
            if (err) throw err;
            

            var numberMonuments= result.length;
            var resultParsed=JSON.parse(JSON.stringify(result));

            var jsonStr = '{"Monuments":[]}';

            var obj = JSON.parse(jsonStr);

            for(i=0;i<numberMonuments;i++){
                obj['Monuments'].push(resultParsed[i]);
            }

            jsonStr = JSON.stringify(obj);
            
            res.send(jsonStr);
            
                    }
    );
    connection.end();
}

);

app.post('/api/buy', function (req, res) {

    
    var connection = mysqlCreateConnection();
    var random=uuidv4();
    connection.connect(function (err) {
        if (err) throw err;
    });
    connection.query("SELECT qrCodeId FROM qr;",
        function (err, result, fields) {
            if (err) throw err;
            
            var numberQr= result.length;
            console.log(random);
            
            
            for(i=0;i<numberQr;i++){
                if(result[i]==random){
                    i=0;
                    random=uuidv4();
                }
            }

        }
    );

    connection.query("INSERT INTO qr (qrCodeId,monumentId,usesLeft) VALUES ("+random+","+monumentId*","+usesLeft+");",
        function (err, result, fields) {
            if (err) throw err;
        }
    );




    connection.end();
});

app.post('/api/validateScanner', function (req, res) {

    
    var connection = mysqlCreateConnection();
    var random=uuidv4();
    connection.connect(function (err) {
        if (err) throw err;
    });
    connection.query("SELECT qrCodeId,monumentId FROM qr WHERE (qrCodeId="+qrCodeId+" AND monumentId="+monumentId+");",
        function (err, result, fields) {
            if (err) throw err;
        
        if(result)
        {
            res.send("accept");




        }

        else
        {
            res.send("denied");
        }

        }
    );

    connection.end();
});





app.listen(3000, () => console.log('Listening on port 3000..'));



function insertLigth (ligthId,monumentId)
{
    var connection = mysqlCreateConnection();

    connection.connect(function (err) {
        if (err) throw err;
    });

    connection.query("INSERT INTO ligth  VALUES ("+ligthId+","+monumentId+","+false+","+0+");",
        function (err, result, fields) {
            if (err) throw err;
        }
    );

    connection.end();

}

function insertLigth (ligthId,monumentId)
{
    var connection = mysqlCreateConnection();

    connection.connect(function (err) {
        if (err) throw err;
    });

    connection.query("INSERT INTO ligth  VALUES ("+ligthId+","+monumentId+","+false+","+0+");",
        function (err, result, fields) {
            if (err) throw err;
        }
    );

    connection.end();

}

function deleteQr (qrcodeId)
{
    var connection = mysqlCreateConnection();

    connection.connect(function (err) {
        if (err) throw err;
    });

    connection.query("DELETE FROM qr WHERE qrCodeId="+qrCodeId+";",
        function (err, result, fields) {
            if (err) throw err;
        }
    );

    connection.end();

}




function mysqlCreateConnection()
{
     //Create mysql connection
        var connection = mysql.createConnection({
        host: 'localhost',
        user: 'pablo',
        password: '1234',
        database: 'tourismDamme'
    });

    return connection;
}


