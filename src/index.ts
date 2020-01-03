import { UserEdit } from "./views/UserEdit";
import { User, UserProps } from "./models/User";
import { UserList } from './views/UserList';
import { Collection } from './models/Collection';

const user = User.buildUser({ name: "FICA", age: 20 });
const userElem = document.getElementById("user");
const userListElem = document.getElementById("list");

if (userElem) {
    new UserEdit(userElem, user).render();
} else {
    throw new Error('Root element not found!')
}

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
    return User.buildUser(json);
});
if (userListElem) {
    users.on('change', () => {
        new UserList(userListElem, users).render()
    }
    )
}

users.fetch();
