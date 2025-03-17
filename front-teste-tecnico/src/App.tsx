import { useState } from "react";
import "./App.css";
import { formatCpf, unformatCpf } from "./utils/cpf-mask";
import axios from "axios";

export const App = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [cor, setCor] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cpfWithoutMask = unformatCpf(cpf);

    const payload = {
      nomeCompleto: nome,
      cpf: cpfWithoutMask,
      email: email,
      corPreferida: cor,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setIsSuccess(true);
        setModalMessage("Dados enviados com sucesso!");
        setNome("");
        setCpf("");
        setEmail("");
        setCor("");
      } else {
        setIsSuccess(false);
        setModalMessage("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setIsSuccess(false);
      setModalMessage("Erro na conexão com o servidor.");
    }

    setIsModalOpen(true);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(e.target.value);
    setCpf(formattedCpf);
  };

  return (
    <div className="container">
      <h2>Formulário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome Completo:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>CPF:</label>
        <input type="text" value={cpf} onChange={handleCpfChange} required />

        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Cor Preferida:</label>
        <select
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          required
          className="color-select"
        >
          <option value="">Selecione uma cor</option>
          <option value="vermelho" className="red">
            Vermelho
          </option>
          <option value="azul" className="blue">
            Azul
          </option>
          <option value="verde" className="green">
            Verde
          </option>
          <option value="amarelo" className="yellow">
            Amarelo
          </option>
          <option value="preto" className="black">
            Preto
          </option>
          <option value="branco" className="white">
            Branco
          </option>
        </select>

        <button type="submit">Enviar</button>
      </form>
      {isModalOpen && (
        <div className="modal">
          <div className={`modal-content ${isSuccess ? "success" : "error"}`}>
            <p>{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
