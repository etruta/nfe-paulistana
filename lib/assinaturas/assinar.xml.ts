import {Assinar} from "./assinar";
import * as fs from "fs";
import { SignedXml } from 'xml-crypto';

export class AssinarXml  extends Assinar {
    async exec(xml,method) {
        await this.config();
        const sig =  new SignedXml();
        sig.keyInfoProvider = new MyKeyInfo();
        sig.addReference(
            `//*[local-name(.)='${method}']`,
            [
                'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
                'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
            ],
            'http://www.w3.org/2000/09/xmldsig#sha1',
            '',
            '',
            '',
            true,
        );
        sig.signingKey = this.chave;
        sig.computeSignature(xml);
        return sig.getSignedXml();
    }
}

function MyKeyInfo() {
    this.getKeyInfo = () => {
        let X509 = fs.readFileSync(`${process.cwd()}/crt.pem`).toString();
        X509 = X509.replace('-----BEGIN CERTIFICATE-----', '');
        X509 = X509.replace('-----END CERTIFICATE-----', '');
        X509 = X509.replace(/[\n\r]/g, '');
        return `<X509Data><X509Certificate>${X509}</X509Certificate></X509Data>`;
    };
    this.getKey = () => fs.readFileSync(`${process.cwd()}/key.pem`).toString();
}
