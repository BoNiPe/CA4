global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var wikiModel = mongoose.model("wikiPedia");

describe('REST API for /wiki', function () {
    //Start the Server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        wikiModel.remove({}, function () {
            var array = [{
                "title": "Nick Title",
                "url": "http://Nick.com",
                "abstract": "Nick Abstract",
                "categories": [
                    "Nick Category"
                ],
                "headings": [
                    {
                        "heading": "Heading 1",
                        "position": "1"
                    },
                    {
                        "heading": "Heading 2",
                        "position": "2"
                    }
                ],
                "links": [
                    "http://Nick.com"
                ]
            },
                {
                    "title": "Boyko Title",
                    "url": "http://Boyko.com",
                    "abstract": "Boyko Abstract",
                    "categories": [
                        "Boyko Category"
                    ],
                    "headings": [
                        {
                            "heading": "Heading 3",
                            "position": "1"
                        },
                        {
                            "heading": "Heading 2",
                            "position": "2"
                        }
                    ],
                    "links": [
                        "http://Boyko.com"
                    ]
                }];
            wikiModel.create(array, function (err) {
                done();
            });
        });
    })

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Should get Nick and Boyko", function (done) {
        http.get("http://localhost:" + testPort + "/api/wiki", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                n[0].title.should.equal("Nick Title");
                n[1].title.should.equal("Boyko Title");
                done();
            });
        })
    });
});
