const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'mailsservice0@gmail.com',
		pass: 'mail@Service123'
	}
});

let mailDetails = {
	from: 'mailsservice0@gmail.com',
	to: 'brajeshmishra825@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
        console.log(err);
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
