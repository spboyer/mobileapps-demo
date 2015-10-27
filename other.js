
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