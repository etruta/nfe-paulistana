import * as crypto from "crypto";
import * as pem from 'pem';
import * as util from "util";
import * as fs from "fs";

export class Assinar {
    protected chave;
    protected certificado;
    private readonly path;
    private readonly senha;

    constructor(path,senha) {
        this.path = path;
        this.senha = senha;
    }

    async config() {
        const readPfx = util.promisify(pem.readPkcs12);
        const dataPfx = await readPfx(fs.readFileSync(this.path),
            { p12Password: this.senha },
        );
        const writeCertificate = util.promisify(fs.writeFile);
        await writeCertificate(`${process.cwd()}/crt.pem`,  dataPfx.cert);
        const writeKey = util.promisify(fs.writeFile);
        await writeKey(`${process.cwd()}/key.pem`, dataPfx.key);
        this.chave = dataPfx.key;
        this.certificado = dataPfx.cert;
    }

    async assinar(data) {
        await this.config();
        const signer = crypto.createSign('RSA-SHA1');
        signer.update(data);
        return  signer.sign(Buffer.from(this.chave), 'base64');
    }
}
