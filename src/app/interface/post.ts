import { Cidade, Estado } from "./localidade";

export interface Post {
    id?: string
    autor?: string;
    categoria?: string;
    subcategoria?: string;
    descricao?: string;
    valorMinimo?: string;
    valorMaximo?: string;
    cep?: string;
    cidade?: Cidade;
    bairro?: string;
    logradouro?: string;
    estado?: Estado;
    data?: any;
    favorito?: boolean;
    foto?: any;
    titulo?: string;
    userId?: any;
}
