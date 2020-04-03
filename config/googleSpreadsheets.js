import { GoogleSpreadsheet } from "google-spreadsheet";

const creds = {
	type: "service_account",
	project_id: "distrodakwah",
	private_key_id: "dcb7b8466e68da671cb8929fe2a49a97ee62ed74",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHM6pgLSolPJDW\nHieMMkwgw0fh+xZIIfdpNDQltBl1pEh7Jsz4kaLSCf02bWlStpuf9uNc80pY1Tmj\n10FNp27Equ1u39FepbdrJtQL4OYLxtctt0tUYDP/+f716UBqtyNRnixyIT89GrSz\nHAgYqOyR0oF4ki9jQmXBxiQewjTmTWXJ+gU1pRGI0xaFdtP+yzSOtvhNPYed2vka\nwSBaDb6/fnt8GMpm6P2142qJmK29mjF07sfrKRIzSsU+JwKcttGTl36bAy80rH/L\nDLgS0SaRIQJQUGFueM4ri40KUsv50pvGKZBR53hoONmz3BIj4exXLlSCg5zW3Jy8\nLRA7i831AgMBAAECggEAYiOOkz59DoZVtt95TWU0Q0niHq/ErPnq+c4pyM9/YYlz\n2hRmFCov5LneIZPquUDU0Aziu9bysGwwLwtsFVVhSYwKWL701+PdxvEEs+tzeqbW\nOSQd/S4+QCTKmx10yn56bIn4TKwbiz+eecVcKcYDct4aQiwHI6hBGKPFBNBaHoFv\n/3B3KynTSLf8R5RbwUat/BDl7yCeW8d6nDCQTHeSBrQOkiu6k5/ko3E4FanZAviZ\nLDEIUg8IaHN9Mky4MhfLJS0CWlGLql4Tu/WYhGtpSPrNjBsmN5HJJhlPAwfuHbs8\nfHhsftpTt6d1dbEFVeyqCqyZhGg4raV3TV4NEHtUWwKBgQD+qDopzErSF91lgBCF\n2eDLmvFrcCz6OC82f53j4mBiC0NDUCADnMmiCLYcU1KcUMDEMtxuQjZlER1f7JWC\n68YqPDoF0x1xwftWadIyt+RrSq9bU0Z2xVH+iBD/Ga4q5x+6iJfltqhlThsCwkLG\nSsvG1lKP5QKE456tiRk76UdI5wKBgQDIQJOnQlG7lOIBHvT4BVkJt8eUe52iB1Lq\nT9pGmqr5wkCwJuktveN+bPN+ImeeA/mEb393PtOZiqnVJclQOR/mOHgu/0PJhjLn\nNsZ+2ny7bj7jXuPZG9NHoiivY4cCl3OD8OsbbTWcb7G86ZQ6xhngk283vq0kITpF\njZLWO1/KwwKBgQDPS1mtVKNDSjHqwcixbJ5UnxgOgQ3b0Yh9MHzyWABlTw296adl\nyWdJAxZbEGia3hFMpKpTBosI0lm7D/bUz+BL2SLSQvwg8esKeLGmn5LM08rS6ILf\ng9gu/cv4HItuWR221iHv2DRT4rSSFlgM2i3u+d/TSnQ2gKNWV9e2sTpZ2QKBgB8u\nlw9bb1izRUIBbQnV41h1CpnfadtaIpoj1wxZdzgu/F2xoWui/vKnyn6gotvjKI5r\nwkByQwbMpcdv+9oHGyWBM4215/tQb0q7p8sHAJc7AoXrN7WN9KdZ49XzvIk1xiIM\neL+rkMaMSfPtt0wznsHuk0nt4g4XMni0I+JCGpd7AoGBAJWxy6MHtLbmBWYX2fQD\n46n2GyLNfJgVcSWm96cWYwu/CH3x7NzXMepnj2lVmZ4KuIuNYKZWVaNKy5sj6jd7\ne4+DtTqumawTX/HEK5yMdJfjd8zGtVNNt/jo56JT8Ph/gclVvpV3yqWdd95n0SG/\nPTNOAlF+gmA98OU6PFYUk5LD\n-----END PRIVATE KEY-----\n",
	client_email: "sheets@distrodakwah.iam.gserviceaccount.com",
	client_id: "104554140958786149188",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/sheets%40distrodakwah.iam.gserviceaccount.com"
};

async function googleSpreadsheetDoc() {
	const doc = new GoogleSpreadsheet(
		"1lRriw0sOv33zyoeIGKKuX4EIUDw_ZD9Q51fOic7REtM"
	);
	await doc.useServiceAccountAuth(creds);
	await doc.loadInfo();
	return doc;
}

export { googleSpreadsheetDoc };
