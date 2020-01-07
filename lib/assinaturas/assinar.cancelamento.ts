import {Assinar} from "./assinar";
import {SocilitarCancelamentoNfe} from "../interfaces/solicitacoes/socilitar.cancelamento.nfe";

export class AssinarCancelamento extends Assinar {
    private readonly inscricaoPrestador;
    private readonly numeroNFe;

    constructor(data:SocilitarCancelamentoNfe,path,senha) {
        super(path,senha);
        this.numeroNFe = data.numeroNFe;
        this.inscricaoPrestador = data.inscricaoPrestador.toString().padStart(12, '0')
    }

    async getAssinatura() {
        const data = `${this.inscricaoPrestador}${this.numeroNFe}`;
        return await this.assinar(data);
    }
}
