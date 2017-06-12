var EventController = function() {};

EventController.prototype.start = function(req, res) {
  var query,
    data,
    simulation,
    start,
    end,
    count,
    randomDate,
    randomPlate;


  end = new Date();
  start = new Date(end.getTime() - (48 * 60 * 60 * 1000));

  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);
  end.setHours(0);
  end.setMinutes(0);
  end.setSeconds(0);

  randomDate = function(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
  };

  randomPlate = function(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString.toUpperCase();
  };

  query = new Promise(function(resolve) {
      data = [];
      for (var i = start.valueOf(); i < end.valueOf(); i += (1000 * 60)) {
        count = Math.floor(Math.random() * (3 - 0)) + 0;
        for (var j = 0; j < count; j++) {
          data.push({ in : new Date(i)
              .valueOf(),
              out: randomDate(new Date(i), end)
              .valueOf(),
              license: randomPlate(6)
          })
        }
      }
      resolve(data);
    })
    .then(function(data) {
      res.json(data);
    });

};

module.exports = EventController;
