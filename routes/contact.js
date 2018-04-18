module.exports = function(router){
        
    router.get('/contact', function(req, res, next) {
        res.render('./contact/contactForm', { title: 'Contact', page: 'contact' })
    });

    router.post('/contact', function (req, res) {
      var emailOptions, SMTPTransport;
      SMTPTransport = nodemailer.createTransport({
        host: 't.pl',
        port: 465,
        secure: true,
        auth: {
          user: "notification@t.pl",
          pass: "crazyHardPass2" 
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
      let name = req.body.name || 'Places website notification';
      let email = req.body.email || 'places-system.com';
      emailOptions = {
          from: name + ' <' + email + '>',
          to: 'other@gmail.com',
          subject: req.body.subject || 'Website contact form',
          text: req.body.message + " \n\n Mail send by: " + name
      };
      SMTPTransport.sendMail(emailOptions, function (err, response) {
          if (err) {
              console.error(err);
              res.render('./contact/contactForm', { title: 'Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' });
          }
          else {
              res.render('./contact/contactForm', { title: 'Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
          }
      });
    });
    
    
    // router.post('/contactClient/', function(req, res, next) {
    //     var email = req.body.email || 'dongron@wp.pl';
    //     var subject = req.body.subject || 'Test subject';
    //     var emailContent = req.body.emailContent || "Content testowy";
    //     let host = 'localhost';//"places-back-end.herokuapp.com";
    //     var transporter = nodemailer.createTransport({
    //         host: host
    //     });
    //     transporter.sendMail({
    //         from: 'PlacesService <ps@' + host + '>',
    //         to: email,
    //         subject: subject,
    //         text: emailContent
    //     }, function(err, info) {
    //         if(err) {
    //             console.log(err);
    //         }
    //         res.send('contact_success');
    //         console.log(email + ' '+subject+' '+emailContent+'!!! \n');
    //     });
    // });


}
