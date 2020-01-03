import { CollectionView } from "./CollectionView";
import { User, UserProps } from "../models/User";
import { UserInfo } from "./UserInfo";

export class UserList extends CollectionView<User, UserProps> {
    renderItem(model: User, itemParent: Element) {
        new UserInfo(itemParent, model).render()
    }
}