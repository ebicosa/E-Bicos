interface Localidade {
  id: number;
  nome: string;
}


export interface Estado extends Localidade {
  sigla: string;
  regiao: Localidade & {
    sigla: string;
  };
}

export interface Cidade extends Localidade {
  microrregiao: Localidade & {
    mesorregiao: Localidade & {
      UF: Estado;
    };
  };
}
