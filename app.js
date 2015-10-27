var express = require('express'),
    soap = require('soap'),
    app = express();

var address_url = 'http://peopleservice.azurewebsites.net/Address.svc?wsdl';
var people_url = 'http://peopleservice.azurewebsites.net/People.svc?wsdl';

var args = { value: 5 };

app.get('/address', function (req, res) {

    soap.createClient(address_url, function (err, client) {
        client.GetAddressData(args, function (err, result) {

            if (!err)
                console.log(err);

            console.log(JSON.stringify(result.GetAddressDataResult.Address[0]));

            res.send(result.GetAddressDataResult);
        });
    });
});


app.get('/people', function (req, res) {

    soap.createClient(people_url, function (err, client) {
        client.GetPeopleData(args, function (err, result) {

            if (!err)
                console.log(err);

            console.log(JSON.stringify(result.GetPeopleDataResult.Person[0]));

            res.send(result.GetPeopleDataResult);
        });
    });
});


app.get('/allpeople', function (req, res) {
    soap.createClient(people_url, function (err, client) {
        client.GetCompletePeople(args, function (err, result) {

            if (!err)
                console.log(err);

            res.send(result.GetCompletePeopleResult);
        });
    });
});

app.get('/list', function (req, res) {
    soap.createClient(people_url, function (err, client) {
        client.GetCompletePeople(args, function (err, result) {

            if (!err)
                console.log(err);

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
