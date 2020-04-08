import { Connection, createConnection } from 'typeorm'
import { UserPgSchema } from '../model/UserDTO';
import { TapePgSchema } from '../model/TapeDTO';
import { injectable } from 'inversify';

@injectable()
export class PgConnection {
    public static connected: boolean = false;
    public static connect(): Promise<Connection> {
        return createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number.parseInt(process.env.DB_PORT || "5432"), //* Default port 5432
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [TapePgSchema, UserPgSchema],
            synchronize: true
        });
    }
    public static connection: Connection;
    public static  async getConnection() : Promise<Connection> {
        if(!this.connected) {
            this.connection = await this.connect();
            this.connected = true;
            return this.connection
        } else {
            return this.connection
        }
    };


}


