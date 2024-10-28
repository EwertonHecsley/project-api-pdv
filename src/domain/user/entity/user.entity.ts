import Email from "../../../shared/value-object/Email";
import Entity from "../../../core/generics/Entity";
import Identity from "../../../core/generics/Identity";

type UserType = {
    name: string;
    email: Email;
    password: string;
}

export class User extends Entity<UserType> {

    static create(data: UserType, id?: Identity): User {
        return new User({ ...data }, id)
    }

    get name() {
        return this.attributes.name;
    }

    get email() {
        return this.attributes.email;
    }

    get password() {
        return this.attributes.password;
    }

    set name(name: string) {
        this.attributes.name = name;
    }

    set email(email: Email) {
        this.attributes.email = email;
    }

    set password(password: string) {
        this.attributes.password = password;
    }
}