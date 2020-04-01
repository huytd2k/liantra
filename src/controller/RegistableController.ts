export interface RegistableController {
    register(app : Express.Application): void;
}