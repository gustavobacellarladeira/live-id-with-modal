const API_URL = 'https://api.liveid.app.br';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.NmU5ZmQ0MzEtOTE0Yy00Njc1LWFkYjAtZjVjNjRlZDUxNDg0.9J8eydQk5fbkH5GKdXkmXpt6wdQWyw8bsbaP5POU6YA';

const BASE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`,
};

export const login = async (cpf: any, senha: any) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: BASE_HEADER,
    body: JSON.stringify({ cpf, senha }),
  });
  const data = await response.json();
  return data;
};

export const cadastro = async (cpf: string, name: string, senha: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: BASE_HEADER,
    body: JSON.stringify({ cpf, name, senha }),
  });
  const data = await response.json();
  return data;
};

export const sendImages = async (UID: any, finger: any, images: any) => {
  const response = await fetch(`${API_URL}/enroll-images`, {
    method: 'POST',
    headers: BASE_HEADER,
    body: JSON.stringify({ UID, finger, images }),
  });
  const data = await response.json();
  return data;
};

export const verifyDigital = async (UID: any, finger: any, image: any) => {
  const response = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: BASE_HEADER,
    body: JSON.stringify({ UID, finger, image }),
  });
  const data = await response.json();
  return data;
};

export const verificaCPF = async (cpf: any) => {
  const response = await fetch(`${API_URL}/validcpf`, {
    method: 'POST',
    headers: BASE_HEADER,
    body: { cpf },
  });
  const data = await response.json();
  return data;
};

export const provaVida = async (
  video: { path: any },
  UID: string,
  vlexposure: any
) => {
  //console.log('Chegou: AAAAQUI');

  const numeroAleatorio = gerarNumeroAleatorio();

  const formData = new FormData();
  formData.append('video', {
    uri: video.path,
    type: 'video/mp4',
    name: UID + '_' + numeroAleatorio + '.mp4',
  });

  formData.append('video_key', numeroAleatorio);
  formData.append('person_id', UID);
  formData.append('exposure', vlexposure);

  let req = await fetch(`${API_URL}/liveness`, {
    method: 'POST',
    headers: {
      'Accept': 'video/mp4',
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: formData,
  });

  if (req.status === 200) {
    const json = await req.json();
    return json;
  } else {
    //const errorHtml = await req.text();
    //console.error("Erro na requisição:", errorHtml);
    const errorJson = {
      code: -1,
      message: 'Erro, por favor, verifique e tente novamente !',
    };
    return errorJson;
  }
};

const gerarNumeroAleatorio = () => {
  const min = 10000000; // Menor número de 8 dígitos (10 milhões)
  const max = 99999999; // Maior número de 8 dígitos (99 milhões 999 mil 999)

  // Gera um número aleatório entre min e max
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

  // Converte o número para string
  const numeroString = numeroAleatorio.toString();

  return numeroString;
};

//https://api.liveid.app.br/change_configs
