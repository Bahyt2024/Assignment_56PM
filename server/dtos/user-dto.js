module.exports = class UserDto {
    email;
    id;
    isActivated;
    activationLink;
    role;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.activationLink = model.activationLink;
        this.role = model.role;
    }
};
