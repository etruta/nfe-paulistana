import {Assinar} from "./assinar";

export class AssinarRps extends Assinar {

    private readonly prestadorInscricaoMunicipal: string;
    private readonly prestadorSerieRPS: string;
    private readonly numeroRPS: string;
    private readonly dataEmissaoRPS: string;
    private readonly tipoTributacaoRPS: string;
    private readonly statusRPS: string;
    private readonly ISSRetido: string;
    private readonly tomadoraCPFCNPJ: string;
    private readonly prestadorCodigoServico: string;
    private readonly valorDeducoes: string;
    private readonly valorServico: string;
    private readonly tomadoraTipoCPFouCNPJ: string;


    constructor(data, path , senha) {
        super(path,senha);
        this.prestadorInscricaoMunicipal = data;
        this.prestadorSerieRPS  = data;
        this.numeroRPS = data;
        this.dataEmissaoRPS = data;
        this.tipoTributacaoRPS = data;
        this.statusRPS = data;
        this.ISSRetido = data;
        this.valorServico = data;
        this.valorDeducoes = data;
        this.prestadorCodigoServico = data;
        this.tomadoraCPFCNPJ = data;
    }

    private getString() {
        return `${this.prestadorInscricaoMunicipal}${this.prestadorSerieRPS}${this.numeroRPS}${this.dataEmissaoRPS}${this.tipoTributacaoRPS}${this.statusRPS}${this.ISSRetido}${this.valorServico}${this.valorDeducoes}${this.prestadorCodigoServico}${this.tomadoraTipoCPFouCNPJ}${this.tomadoraCPFCNPJ}`;
    }

    getAssinatura() {
        return this.assinar(this.getString())
    }
}
