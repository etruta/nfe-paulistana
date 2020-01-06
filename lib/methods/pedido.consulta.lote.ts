import { create } from 'xmlbuilder';
import {Methods} from "../interfaces/methods";
import {SolicitarConsultaLote} from "../interfaces/solicitacoes/solicitar.consulta.lote";

export class PedidoConsultaLote implements Methods {

   public HEAD = "PedidoConsultaLote";
   public  Retorno = "RetornoConsulta";

   constructor(private  readonly data: SolicitarConsultaLote) {}

   public buildXML() {
      return create('PedidoConsultaLote')
          .att('xmlns', 'http://www.prefeitura.sp.gov.br/nfe')
          .ele('Cabecalho', { xmlns: '', Versao: '1' })
          .ele('CPFCNPJRemetente')
          .ele('CNPJ', {}, this.data.cnpj).up().up()
          .ele('NumeroLote').text(this.data.numeroLote.toString()).up().up()
          .end({ pretty: false });
  }

}
