/*jshint node:true*/
module.exports = {
  "server": {
    options: {
      port: 80,
      base: '.',
      //keepalive: true,
      livereload: 35729,
      hostname: '127.0.1.1'
    }
  },
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
    "PhantomJS",
    "Chrome"
  ]
};
