export const formatCpf = (value: string): string => {
  let cpf = value.replace(/\D/g, "");

  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return cpf;
};

export const unformatCpf = (value: string): string => {
  return value.replace(/\D/g, "");
};
