import { IsNotEmpty , Contains } from "class-validator";

export class Tape {
    id?: string;

    @IsNotEmpty()
    title!: string;
    
    @Contains("youtube.com")
    ytUrl!: string;
    
    level!: number;

    description!: string;
    
    script!: string
}

