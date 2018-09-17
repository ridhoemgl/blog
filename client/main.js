const app = new Vue({
    el: '#app',
    data() {
        return {
            isLogin: false,
            articles: [],
            categories: [],
            cart: 0,
            user:{
                name: '',
                email: '',
                password: ''
            }
        }
    },
    mounted() {
        this.getItems(),
        this.getCategories()
    },
    methods: {
        addCart() {
            this.cart++
        },
        getItems() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/item/display'
            })
                .then(response => {
                    this.items = response.data.items
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getCategories() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/category/display'
            })
                .then(response => {
                    console.log(response.data.categories);
                    this.categories = response.data.categories
                })
                .catch(error => {
                    console.log(error);
                })
        },
        registerSubmit(){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/add',
                data:{
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(() => {
                window.location = 'index.html'
            })
            .catch(error => {
                console.log(error);
            })
        },
        loginSubmit(){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/login',
                data:{
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                window.location = 'dashboard.html'
            })
            .catch(error => {
                console.log(error); 
            })
        },
        filterItem(name){
            axios({
                method: 'GET',
                url: `http://localhost:3000/item/filter/${name}`
            })
            .then(response => {
                this.items = response.data.items
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})