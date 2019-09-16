(function () {
    const app = require("express")();
    const http = require("https");
    const async = require("async");
    const dotenv = require('dotenv');
    dotenv.config();

    app.get("/api/businesses", function (req, res) {
        let finalResponse = [];
        let location = req.query.location ? req.query.location : "Alpharetta";
        let limit = req.query.limit ? req.query.limit : "5";
        let options = {
            port: 443,
            hostname: 'api.yelp.com',
            path: '/v3/businesses/search?location=' + location + '&term=icecream&sort_by=rating&limit=' + limit,
            method: 'GET',
            bearerToken: process.env.API_Key,
            headers: {
                Authorization: 'Bearer ' + process.env.API_Key
            }
        };
        const request = http.request(options, response => {
            let responseData = "";
            response.on('data', d => {
                responseData += d;
            });
            response.on('end', function () {
                responseData = JSON.parse(responseData).businesses;
                if (!responseData) {
                    res.status(400).send("No Result Found");
                } else {
                    let transactionNo = 0;
                    let lengthOfInstructionForProcessing = responseData.length;
                    async.whilst(function () {
                            return transactionNo < lengthOfInstructionForProcessing;
                        },
                        function (next) {
                            options.path = "/v3/businesses/" + responseData[transactionNo].id + "/reviews";
                            const request = http.request(options, response => {
                                let responseD = "";
                                response.on('data', d => {
                                    responseD += d;
                                });
                                response.on('end', function () {
                                    responseD = JSON.parse(responseD).reviews[0];
                                    finalResponse.push({
                                        name: responseData[transactionNo].name,
                                        address: responseData[transactionNo].location.display_address.join(", "),
                                        review: responseD.text,
                                        reviewBy: responseD.user.name
                                    });
                                    transactionNo++;
                                    next();
                                })
                            });
                            request.on('error', error => {
                                console.error(error)
                            });

                            request.end();
                        },
                        function (err, result) {
                            if (err) {
                                res.status(400).send("Unable to process request");
                            } else {
                                res.status(200).json(finalResponse);
                            }
                        });
                }
            })
        });
        request.on('error', error => {
            console.error(error)
        });

        request.end();
    });

    app.listen(process.env.PORT, function () {
    });
})();