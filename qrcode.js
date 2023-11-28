const QRCode = require('qrcode-generator');

const textoParaQR = '¡Clevert-bot!';

const tipoQR = QRCode(0, 'L'); // Parámetros: (tipo, nivel de corrección)
tipoQR.addData(textoParaQR);
tipoQR.make();

console.log(tipoQR.createASCII());