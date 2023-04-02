import { FileHandle } from "./file-handle.model";

export interface Product {
    name: string,
    description: string,
    price: number,
    images: FileHandle[]
}