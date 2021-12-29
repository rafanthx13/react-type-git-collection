import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';

// Essa interface vai além de definir o retorno da api, vai tambem
// limitar e fazer com que so se pegue esses elementos da API
interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  // STATES :: Definindo estados no React, como usamos TypeScript, temos que por a tipagem

  // Estado que armazena os repos já pesquisados. Toda vez que cair no Dashoboard vai carregar
  // repos se inicia como o que tem em localstorage, se tiver, ou como []
  const [repos, setRepos] = React.useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });

  // Estado que armazena o que o usuário por no input
  const [newRepo, setNewRepo] = React.useState('');

  // Estado para armazenar mensagem de erro caso nao tiver
  const [inputError, setInputError] = React.useState('');

  // USE-REF
  // useRef ou seja, uma ref a um elemento da DOM
  const formEl = React.useRef<HTMLFormElement | null>(null);

  // FUNCTIONS

  // É equivalente ao v-model do vue. No react tem que ser feito manualmente
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  // USE-EFFECT
  // Algo que é executado quando a pagina é criada ou quando um estado é alterado
  // Tudo que está dentrodo useEffect deve ser referenciado dentro do array do segundo parâmetro, por isso termina com '[repos]'
  // Quando repo for alterado, colocamos ele no localStorage
  React.useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  // Vai consumir a API
  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault(); // preve que mude de pagina, a açâo default de um form

    // Caso for chamado e não tem nenhum dado vai passar esse erro
    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    try {
      // ${newREpo} vai buscsar a o estado newRepo, como um 'this.newRepo` se fosse veue
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);

      const repository = response.data;

      // estou passando para o array de repos, tudo que tem no repos (operador spread) mais o que veio da API
      setRepos([...repos, repository]);
      // Se tiver pegado um repo e tiver algo,entao, da um rest no DOM-do-button.Assim ,vai apagar o form quando dar certo
      formEl.current?.reset();
      // Apaga somente o estado, e não o elemento da dom. É por isso que chamaos 'formEl' acima
      setNewRepo('');
      setInputError(''); // garanto que a mensagem derro sai quando inseriri um repo valido
    } catch {
      // Adiciona uma mensagme de erro caso noa vinher do github
      setInputError('Repositorio nao encontrado no Github');
    }
  }

  // RENDER
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      {/* v-for no react :como o vue, exeige uma chave,  que é a 'key' */}
      <Repos>
        {/* Porque coloquei esse index? porque sem isso, da erro se voce por
            dois repositorios de mesmo nome, pois terão a mesma chave
            Asism, eu garanto que seja sempre diferente ao adiconar o index do array
         */}
        {repos.map((repository, index) => (
          <a
            href={`/repositories/${repository.full_name}`}
            key={repository.full_name + index}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};
