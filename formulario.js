/*
  Função que valida o formulário antes de enviar.
  Retorna true -> deixa o formulário ser enviado.
  Retorna false -> bloqueia o envio.
*/
function validaForm() {
  const nome = document.getElementById("nome").value.trim();   // pega o valor do campo nome e tira espaços extras
  const email = document.getElementById("email").value.trim(); // pega o email
  const msg = document.getElementById("msg").value.trim();     // pega a mensagem

  // VALIDAÇÃO 1: nome tem que ter pelo menos 3 caracteres
  if (nome.length < 3) {
    alert("Nome muito curto, né pai? Coloca um nome decente aí 😅");
    return false;
  }

  // VALIDAÇÃO 2: email precisa ter @ e não pode ser muito curto
  if (!email.includes("@") || email.length < 8) {
    alert("Email inválido, mano. Coloca um email decente aí 😅");
    return false;
  }

  // separa em duas partes: antes e depois do @
  const partes = email.split("@");

  // se não tiver duas partes (ex: "algo@algumacoisa"), inválido
  if (partes.length !== 2) {
    alert("Email mal formatado.");
    return false;
  }

  // verifica tamanho da parte local (antes do @)
  if (partes[0].length < 3) {
    alert("A parte antes do @ tem que ter pelo menos 3 caracteres.");
    return false;
  }

  // Se tudo certo:
  alert("Formulário enviado! 🔥");
  return true;
}
