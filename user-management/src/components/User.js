class User {
    constructor(name, surname, nickname, password, age, email, role) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.age = age;
        this.email = email;
        this.role = role;
    }

    validatePassword(inputPassword) {
        return this.password === inputPassword;
    }

    updateDetails(details) {
        Object.assign(this, details);
    }
}
