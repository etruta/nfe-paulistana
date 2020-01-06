import {Methods} from "../interfaces/methods";
import { create } from 'xmlbuilder';
import {SocilitarCancelamentNfe} from "../interfaces/solicitacoes/socilitar.cancelament.nfe";

export class PedidoCancelarNfe  implements Methods {

    HEAD = "PedidoCancelamentoNFe";
    Retorno;
    constructor(private readonly data: SocilitarCancelamentNfe) {}

    buildXML() {
        return create('PedidoCancelamentoNFe')
            .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
            .att('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema')
            .att('xmlns', 'http://www.prefeitura.sp.gov.br/nfe')
            .ele('Cabecalho', { xmlns: '', Versao: '1' })
            .ele('CPFCNPJRemetente')
            .ele('CNPJ', {}, this.data.cnpj).up().up()
            .ele('transacao').text('false').up().up()
            .ele('Detalhe').att('xmlns', '')
            .ele('ChaveNFe')
            .ele('InscricaoPrestador').text(this.data.inscricaoPrestador).up()
            .ele('NumeroNFe').text(this.data.numeroNFe).up().up()
            .ele('AssinaturaCancelamento').text("")
            .end({ pretty: false });
    }

}

