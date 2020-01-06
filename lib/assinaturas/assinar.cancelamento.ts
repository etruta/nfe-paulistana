import {Assinar} from "./assinar";
import {SocilitarCancelamentNfe} from "../interfaces/solicitacoes/socilitar.cancelament.nfe";

export class AssinarCancelamento extends Assinar {
    private PrestadorInscricaoMunicipal;
    private NumeroNFe;

    set numeroNfe(value: string) {
        this.NumeroNFe = value.toString().padStart(12, '0');
    }

    async getAssinatura() {
        const data = `${this.PrestadorInscricaoMunicipal}${this.NumeroNFe}`;
        return await this.assinar(data);
    }
}
