import { User } from "./Models/User";

const user = new User({ name: "stephen" });

user.set({ name: "Filip", age: 0 });

user.save();
