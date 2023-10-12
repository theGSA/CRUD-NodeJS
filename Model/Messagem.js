

const tipoMensagem =
{
    ERRO: "erro",
    SUCCESS: "success",
}

class Mensagem
{
    ERRO = 'erro';
    SUCCESS = "success";
    constructor(tipo, content)
    {
        this.tipo = tipo;
        this.content = content;
    }
}

module.exports = {tipoMensagem, Mensagem};