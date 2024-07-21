import { Interaction } from "discord.js";

export class Command {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    name: string;
    description: string;

    async execute(interaction: Interaction) {
        throw new Error('Method not implemented');
    }
}