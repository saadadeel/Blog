var Twitter = require('twitter');
 
console.log("twitter");

var client = new Twitter({
  consumer_key: 'zVXrzlnsiKPkoNIUtxEHt4L2G',
  consumer_secret: 'ODN0CgMzW1JaaanvfGcFpOMnPX3yw5RDJPLyg2UAFLsXbtCwWx',
  access_token_key: '3323469159-zNgAKADtIDINphEXvi1D7ZYYfRVL9tYZYGpl4hy',
  access_token_secret: 'zvStlkjyaKPH5NmmMSv6EGh35tcYovk7qbyf9tDmX8SUR'
});


client.stream('statuses/filter', {track: 'Mad Max'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});