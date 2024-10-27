export default class Email {
    private constructor(readonly value: string) {
        this.value = value;
    }

    static create(value: string) {
        return new Email(value);
    }

    public validate() {
        return !!this.value
            .toLocaleLowerCase()
            .match(
                /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(?:[a-zA-Z]{2,})$/
            )
    }
}