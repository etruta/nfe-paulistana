import { create } from 'xmlbuilder';
import {Methods} from "../interfaces/methods";
import {SolicitarConsultarNfe} from "../interfaces/solicitacoes/solicitar.consulta.nfe";

export class PedidoConsulta implements Methods {

  public HEAD = "PedidoConsultaNFe";
  public  Retorno = "RetornoConsulta";

  constructor(private readonly data: SolicitarConsultarNfe) {}

  public buildXML() {
    return create('PedidoConsultaNFe')
        .att('xmlns', 'http://www.prefeitura.sp.gov.br/nfe')
        .ele('Cabecalho', { xmlns: '', Versao: '1' })
        .ele('CPFCNPJRemetente')
        .ele('CNPJ', {}, this.data.cnpj).up().up().up()
        .ele('Detalhe').att('xmlns', '')
        .ele('ChaveNFe')
        .ele('InscricaoPrestador').text(this.data.inscricaoPrestador).up()
        .ele('NumeroNFe').text(this.data.numeroNFe.toString()).up().up().up()
        .end({ pretty: false });
  }
}
