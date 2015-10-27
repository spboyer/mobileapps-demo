var express = require('express'),
    soap = require('soap'),
    compression = require('compression'),
    app = express();

var address_url = 'http://peopleservice.azurewebsites.net/Address.svc?wsdl';
var people_url = 'http://peopleservice.azurewebsites.net/People.svc?wsdl';

var args = { value: 25 };

app.use(compression());
app.get('/allpeople', function (req, res) {
    soap.createClient(people_url, function (err, client) {
        client.GetCompletePeople(args, function (err, result) {

            if (err !== null){
                console.log(err);
            }

            res.send(result.GetCompletePeopleResult);
        });
    });
});

app.get('/list', function (req, res) {
    soap.createClient(people_url, function (err, client) {
        client.GetCompletePeople(args, function (err, result) {

            if (err !== null){
                console.log(err);
            }

            var list = [];
            var items = result.GetCompletePeopleResult.PersonMajor;

            items.forEach(function (p) {
                var person = {};
                person.id = p.Id;
                person.First = p.ItemPersonData.First;
                person.Last = p.ItemPersonData.Last;
                person.Middle = p.ItemPersonData.Middle;

                list.push(person);
            });

            res.send(list);
        });
    });
});

app.listen(process.env.PORT || 5400);
