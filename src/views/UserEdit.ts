import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from '../views/UserForm'
import { UserInfo } from '../views/UserInfo'

export class UserEdit extends View<User, UserProps>{
    componentsMap(): { [key: string]: string } {
        return {
            userInfo: '.user-info',
            userForm: '.user-form'
        }
    }
    onRender(): void {
        new UserInfo(this.components.userInfo, this.model).render();
        new UserForm(this.components.userForm, this.model).render();
    }

    template(): string {
        return `
        <div>
          <div class="user-info"></div>
          <div class="user-form"></div>
        </div>
        `
    }
}