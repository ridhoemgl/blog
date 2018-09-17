
process.env.DB_TEST="TEST"
const User = require('../models/user')
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', function() {
    let userObj = {}
    
    beforeEach(function(done) {
        User.create({
            name: 'test',
            email: 'test@mail.com',
            password: '123'
        })
        .then(user => {
            userObj = user
            done()
        })
    })

    afterEach(function(done) {
        User.deleteMany(function (err) {
            if(err){
                console.log(err)
            }
            done()
         });
    })

    it('DISPLAY ALL USERS on /users (GET)', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
    it('DISPLAY USER BY ID on /users/:id (GET)', function(done) {
        chai.request(app)
            .get('/users')
            .send({id: '5b9f35107fa94119caa9fe29'})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
    it('SIGN UP on /users/signup (POST)', function(done) {
        chai.request(app)
            .post('/users/signup')
            .send({ name: 'test3', email: 'test1@mail.com', password: '123' })
            .end(function(err, res) {
                expect(res).to.have.status(201)
                done()
            })
    })
    it('SIGN IN on /users/signin (POST)', function(done) {
        chai.request(app)
            .post('/users/signin')
            .send({ email: userObj.email, password: userObj.password })
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('user')
                expect(res.body.user).to.be.a('object')
                expect(res.body.user.name).to.equal('test')
                expect(res.body.user.email).to.equal('test@mail.com')
                expect(res.body.user.password).to.equal('123')
                done()
            })
    })
    it('EDIT on /users/:id (PUT)', function(done) {
        chai.request(app)
            .put(`/users/${userObj._id}`)
            .send({ name: 'updatedName' })
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })
    it('DELETE on /users/:id (DELETE)', function(done) {
        chai.request(app)
            .delete(`/users/${userObj._id}`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

})