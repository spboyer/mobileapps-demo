  var express = require('express'),
      soap = require('soap'),
      app = express();

  var address_url = 'http://peopleservice.azurewebsites.net/Address.svc?wsdl';
  var people_url = 'http://peopleservice.azurewebsites.net/People.svc?wsdl';

  var args = {value: 5};

  app.get('/address', function(req, res){

    soap.createClient(address_url, function(err, client) {
        client.GetAddressData(args, function(err, result) {
            //console.log(result);
            /// result.GetAddressDataResult.Address[0..args]

            console.log(JSON.stringify(result.GetAddressDataResult.Address[0]));

            res.send(result.GetAddressDataResult);
        });
    });
  });


  app.get('/people', function(req, res){

    soap.createClient(people_url, function(err, client) {
        client.GetPeopleData(args, function(err, result) {
            //console.log(result);
            /// result.GetAddressDataResult.Address[0..args]

            console.log(JSON.stringify(result.GetPeopleDataResult.Person[0]));

            res.send(result.GetPeopleDataResult);
        });
    });
  });



app.listen(process.env.PORT || 5400);
