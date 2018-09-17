const b = require('bcryptjs')

let hash = b.hashSync('123', 8)

console.log(hash)

let a = '$2a$08$buobYPYe.aAGEeaURl8UqOh88tQMUUXPNbq.tUnFW7gJAbj7dWv/e'

let anjing = b.compareSync('123', a)
console.log(anjing);
