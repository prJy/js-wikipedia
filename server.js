const express = require('express')
const request = require('request')
const app = express()

function serverStart() {
    const content = {}

    function searchInWikipediaAndReturnJSON() {
        content.urlAPI = getWikipediaAPIUrl();
        return new Promise(function(resolve, reject) {
            request(content.urlAPI, {
                json: true
            }, (err, res, body) => {
                if (err) {
                    reject(err)
                }
                let items = {
                    searchResults: body.query.search
                }
                resolve(items);
            })
        })
    }

    function getWikipediaAPIUrl() {
        return `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${content.searchTerm}`
    }

    app.get('/search/:searchTerm', (req, res) => {
        content.searchTerm = req.params.searchTerm
        var searchPromise = searchInWikipediaAndReturnJSON()
        searchPromise.then(function(result) {
            res.json(result)
        }, function(err) {
            res.json(500, {
                msg: 'Error processing your solicitation'
            })
            throw (err);
        }).catch((err) => {
            res.json(500, {
                msg: 'Error processing your solicitationo'
            });
            throw (err);
        });
    })

    app.use(express.static(__dirname + '/html'))
    app.listen("8080")
    console.log('The Magic Happens on 8080');
}

serverStart();