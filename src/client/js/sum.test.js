

const sum = require('./sum');

const { validURL } = require('./API');



test('this is a http test', done => {
	  try {
		validURL("http://www.google.com");
		done();
	  } catch (error) {
		done(error);
	  }
});

test('Just a wwww', done => {
	try {
	  validURL("www.google.com");
	  done();
	} catch (error) {
	  done(error);
	}
});


test('no http or www', done => {
	try {
	  validURL("google");
	  done();
	} catch (error) {
	  done(error);
	}
});
