import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K>{
    components: { [key: string]: Element } = {}

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    abstract template(): string;

    componentsMap(): { [key: string]: string } {
        return {}
    }

    eventsMap(): { [key: string]: () => void } {
        return {}
    };

    bindModel(): void {
        this.model.on("change", () => {
            this.render();
        });
    }
    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(":");
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    mapComponents(fragment: DocumentFragment): void {
        const componentsMap = this.componentsMap();

        for (let key in componentsMap) {
            const selector = componentsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.components[key] = element;
            }
        }
    }
    onRender(): void {

    }

    render(): void {
        this.parent.innerHTML = "";

        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapComponents(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}