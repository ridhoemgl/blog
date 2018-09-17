process.env.DB_TEST="TEST"
const User = require('../models/user')
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const hashPassword = require('../helpers/hashPassword')


chai.use(chaiHttp);

let userObj = {}

describe('User', function() {
    
    beforeEach(function(done) {
        User.create({
            name: 'aaa',
            email: 'aaa@mail.com',
            password: hashPassword('123')
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
            .send({ name: userObj.name, email: userObj.email, password: userObj.password })
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
                expect(res.body.user).to.have.property('name')
                expect(res.body.user).to.have.property('email')
                expect(res.body.user).to.have.property('password')
                expect(res.body.user).to.be.a('object')
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

describe('Article', function() {
    it('CREATE ARTICLE /articles/add (POST)', function(done) {
        chai.request(app)
            .post('/articles/add')
            .send({ userId: `${userObj._id}`, title:'THIS IS TITLE', description:'THIS IS DESCRIPTION' })
            .end(function(err, res) {
                expect(res).to.have.status(201)
                done()
            })

    });
    it('DISPLAY ALL ARTICLES /articles (GET)', function(done) {
        chai.request(app)
            .get('/articles')
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
    it('DISPLAY USER ARTICLE /articles/:id (GET)', function(done) {
        chai.request(app)
            .get('/articles')
            .send({id: '5b9fb8008a303119fca608b8'})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
    it('EDIT USER ARTICLE /articles/:id (GET)', function(done) {
        chai.request(app)
            .put(`/articles/5b9fb8008a303119fca608ba`)
            .send({ title: 'updatedTitle' })
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
    it('DELETE USER ARTICLE /articles/:id (GET)', function(done) {
        chai.request(app)
            .delete(`/articles/5b9fb8008a303119fca608ba`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    });
})