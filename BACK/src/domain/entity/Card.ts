export class Card {
  id?: number;
  titulo: string;
  conteudo: string;
  lista: string;

  constructor(id: number, titulo: string, conteudo: string, lista: string) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.lista = lista;
  }
}
