var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/:year/:month/:day', function(req, res, next) {
    var token = req.session.token;
    var user_id = req.session.user_id;
    var date = req.params.year + '-' + req.params.month + '-' + req.params.day;

    axios.get('https://api.fitbit.com/1/user/' + user_id + '/activities/date/' + date + '.json',
        {headers: {'Authorization': 'Bearer ' + token}})
        .then(function (response) {
            console.log(response.data.goals.steps)
            return res.render('step', {step:response.data.summary.steps})

        })
        .catch(function (response) {
            return res.json({data:response});
        });

});


module.exports = router;
