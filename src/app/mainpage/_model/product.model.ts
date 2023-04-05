import { FileHandle } from "./file-handle.model";

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    images: FileHandle[]
}