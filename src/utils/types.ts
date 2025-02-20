import { RowDataPacket } from "mysql2"

export type UserRowDataPacket = RowDataPacket & {
    id: number;
    email: string;
    password: string;
  }
  