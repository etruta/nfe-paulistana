import {Methods} from "../interfaces/methods";
import {Config} from "../interfaces/config";
import {AssinarXml} from "../assinaturas/assinar.xml";

export class XMLBuildStrategy {

    constructor(
        private readonly method: Methods,
        private readonly config: Config)
    {}

    public async build() {
        try {
            const assinatura = new AssinarXml(this.config.certificado.path,this.config.certificado.senha)
            let xml = await this.method.buildXML();
            xml = await assinatura.exec(xml,this.method.HEAD);
            return xml;
        } catch (e) {
            return e
        }
    }
}
