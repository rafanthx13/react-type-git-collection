# Curso Udemy - Aluizo Develop - React and TypeScript - GitCollection

Concluído em 28/12/202. Código+Deploy+Doc+Ensinamentos

Repo original: https://github.com/aluiziodeveloper/gitcollection

## O que é o projeto

É um projeto simples usando React e TypeScript. É uma interface para consultar repositórios do git e ver as suas `issues`.  

**Ações**

+ Você colocar o user/repo nesses formato `rafanthx13/log-price-comparator`. Em seguida clica em buscar. Se der tudo certo, vai abrir nesse componente uma lista de Repos tendo apenas esse Repo para consultar. Clicando nele vai levar ao componente Repo onde você pode encontrar as suas issues
+ Essa lista de Repos em Dashboard fica no locaStorage, dura bastante tempo

**Features**
+ Usa-se a API pública e gratuita do Git para consultar os dados
+ Dados são armazenados no local Storage

## Libs Utilizadas

`polished`: usado em 'shade' permite escurecer uma cor de forma numérica (exercer em 20% ao passar o hover no botão)
`react-icons`: permite importar icones (material/feath/fontawesome) de forma bem fácil
`cra-bundle-analyzer`: 'cra' significa `create-react-app`. Essa lib permite ver o tamanho do bundle do react e assim ter ideias de como otimizá-lo.
`styled-components`: permite estilizar os componentes react de forma mais eficiente do que o css comun, pois este tem **vazamento de css**.

## Curiosidades interessantes na construção do projeto

**VSCode nome de arquivo + pasta**

+ Na criação de um ARQUIVO, e não de uma pasta
+ Você pode criar uma pasta e arquivo ao fazer com `pasta/arquivo.ext` vai criar os dois juntos

**JSX lembrete do JSX**

+ As classe do HTML do jsx são chamada de className
+ comentários no jsx {/* */}

**Export no react**

+ O arquivo `routes/index.tsx` não é exportado como default da mesma forma que o `App.tsx`. Isso porque não é muito bom exportar como default, porque permite que quem importa esse modelo mude seu nome. Por isso, para `routes/index.tsx` colocamos um simples export na constante
+ Só foi exportado por default para otimizar o bundle no final

**Template para um  novo componente react/typed**
````tsx
import React from 'react';

export const Routes: React.FC = () => {
  return (
    <>
      <h1>Olá Dev!</h1>
    </>
  );
};
````

## Start Project

### Configuração do VSCODE

Digite: CTRL +P e busque `Preference: Open Settings (JSON)` (É um arquivo JSON de poucas linhas (cerca de 50))

E tenha o seguinte código para que interprete o JSX como JavaScript corretamente.

````json
"emmet.syntaxProfiles": { "javascript": "jsx },
"emmet.includeLanguages": {
  "javascript": "javascriptreact"
},

````

Se mostrar um errinho no editor VSCode como o abaixo

````
Cannot use JSX unless the '--jsx' flag is provided.ts(17004)
````

Clique na versão do TypeScript usada pelo VSCode e configure-o para usar a do `node_modules` local:

link desta solução: https://stackoverflow.com/questions/50432556/cannot-use-jsx-unless-the-jsx-flag-is-provided

### Link de template inicial

este é um git clone do link a seguir

https://github.com/aluiziodeveloper/curso-reactjs-instalacao-app-gitcollection

É um projeto react criado com 'creat-react-app' + configurações do editorconfig, eslint e prettier já prontos.

### Como foi criado esse template

````sh
npx create-react-app gitcollection --template=typescript
````

Apaga os arquivos:
+ App.css
+ App.tsx
+ index.css
+ logo.svg

Deixa so 3 na pasta `src`
+ App.tsx
+ index
+ react-app-env.d.ts

E na pasta `public` deixar somente
+ index.html
+ favicon.png

## Conceitos de React

O projeto tem a seguinte estrutura

Começa com `index.tsx`

````tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
````

E depois vai para `App.tsx`

````tsx
// App.tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <h1>Olá Dev!</h1>
    </>
  );
};

export default App;
````


## Trabalhando com rotas react-router-dom

````sh
npm install react-router-dom@5.2.0
npm install -D @types/react-router-dom
````

Cria `routes/index.tsx` e coloque o código a seguir

````tsx
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={ Dashboard } path="/" exact />
      <Route component={ Repo } path="/repositories" />
    </Switch>
  );
};
````

E crie as páginas dos componente DashBoard e Repo que serão uma pasta (com nome maiúsculo) e dentro de cada um terá `index.tsx` e `style.ts`.

Da mesma forma que o vue, quando você importa uma pasta, vai buscar o index dentro dela

Agora, para implementar esse roteamento vamos modificar o App.tsx para usar react-router-dom, com nossos rotas

### Usando Link do react-router-dom

somente através de links (do compoentne do react-router-dom) o react vai trocar de páginas sem fazer o realod, ou seja, funcionar como uma SPA.

Assim trocamos disso

````html
<a href={`/repositories/${repository.full_name}`}></a>
````

Para isso

````tsx
// /src/pages/Dashboard/index.tsx
import { Link } from 'react-router-dom';
<Link to={`/repositories/${repository.full_name}`}  >
````


## Styled Components

Ferramenta para por css dentro do jsx.

O problema é que o react não sabe muito bem diferenciar css de dentro de um componente para um externo. Ele vaza CSS.

Por default, se um componente jsc importa um arquivo .css normal, ele estiliza não só aquele componente mas também todos os outros componentes, de todos os outros locais, ficando assim de forma global

Vamos usar a lib `Styled Components`

https://styled-components.com/

Cria-se o arquivo style.ts para os componetes como o a seguir:

````typescript
// style.ts
const Button = styled.a`

  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
````

como é usado  pelo componente react que o importa

````tsx
// index.tsx
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
)

````

Stylized componente não só define o CSS como também define um elemento HTML. 

No exemplo acima, perceba que o componente `Button` recebe atributos HTML como o de uma TAG A. Isso porque ele é renderizado como uma tag A já que na sua definição está: `styled.a`

**Instalar StylizedComponentes**

````sh
npm install --save styled-components

npm install --D @types/styled-components
````

Instale a extensão `'vscode-styled-components`' do VSCode

Outro exemplo de como estilizar um h1

````tsx
// src/pages/Dashboard/style.ts
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;
````


````tsx
// Dashboard/index.tsx
import React from 'react';

import { Title } from './styles';

export const Dashboard: React.FC = () => {
  return <h1>Dashboard</h1>;
  return <Title>Dashboard</Title>;
};
````

### Styled Componente de forma global

Criamos o seguinte arquivo com o componente `createGlobalStyle`

````tsx
// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';

import imgBackground from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

body {
    background: #f0f0f5 url(${imgBackground}) no-repeat 70% top;
    -wekit-font-smoothing: antialiased;
  }

  body, input, textarea, select, button {
    font: 400 1rem "Roboto", sans-serif;
  }
`
````

e chamamos ele em `App.tsx`

````tsx
// App.tsx
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};
````


### Importar fonte

Em i`ndex.html`

````html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
````

Se for global, basta por o `global.ts` como um componente junto de `App.tsx` na parte de rotas, que assim vai ser aplicado globalmente.

Agora, para aplicar localmente, você importa o `styles.ts` em `indes.tsx` como se fosse um componente. O que estiver dentro dele é que será estilizada daquela forma


### Usando react-icon

Importa o componente e o usa como um componente

````tsx
// Dashboard.tsx
import { FiChevronRight } from 'react-icons/fi';

<Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/68967867?v=4"
            alt="Repositorio"
          />
          <div>
            <strong>aluiziodeveloper/mini-curso-reactjs</strong>
            <p>Repositório do mini curso gratuito de reactjs</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
````


## Acessando a API com Axios

Instalar Axios

````sh
npm i --save axios
````

Arquivo com a instância do Axios

````typescript
// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.github.com',
});
````

Usando em Dashboard, esse componente foi bem alterado par usamos a API de forma assíncrona

````tsx
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repos } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';

// Essa interface vai além de definir o retorno da api, vai também
// limitar e fazer com que só se pegue esses elementos da apis
interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {

  // STATES
  // Definindo estados no React, como usamos TypeScript, temos que pôr a tipagem
  const [repos, setRepos] = React.useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');

  // FUNCTIONS

  // Quando mudar o que está no botão, vai mudar o valor do estado
  // Retorna void (nada) e é quando ocorre a change na HTMLInputElement
  // Assim, quando o elemento HTML mudar, vai  mudar o estado que assim vai se tornar variável
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  // Vai consumir a API
   async function handleAddRepo( event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault(); // prevê que mude de página

    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    // ${newREpo} vai buscar a o estado new Repo e por aki
    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    const repository = response.data;

    // estou passando para o array de rpos, tudo que tem no repos (operador spread) mais o que veio da API
    setRepos([...repos, repository]);
    setNewRepo('');
  }

  // RENDER
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>

      <Form>
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {/* v-for no react
          + como o vue, exeige uma chave,  que é a 'key'

      */}
      <Repos>
        {repos.map(repository => (
          <a href="/repositories" key={repository.full_name}>
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

````

## Local Storage

Armazena por mais tempo do que a sessão
+ É sempre armazenado com string

pegar do local storage

````tsx
// Get
const storageRepos = localStorage.getItem('@GitCollection:repositories');
// Setar
localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos) );
````

## useRef

Permite manipular elementos internos da DOM. Vamos usar isso para que, após fazermos a consulta, o input do formulário seja limpado na Dashboard. Pois até então o que era apagado era apenas o dado do estado, que não é o valor do elemento da DOM. Curiosamente, no vue isso é muito mais fácil de fazer, pois o elemento da dom é o estado `data()`

````tsx
// Estado que armazena a referência ao elmento da DOM
const formEl = React.useRef<HTMLFormElement | null>(null);
````

Usando

```tsx
// Vai resetar o valor desse elemento da DOM
formEl.current?.reset();
```

Indicando qual elemento da DOM é esse

```tsx
<Form
    ref={formEl}
    hasError={Boolean(inputError)}
    onSubmit={handleAddRepo}
>
```



## React dev tool

Extensão do chrome que permite não só ver os componentes com também analisar a performance


## Analisando Bundle

Instale a seguinte lib

````sh
npm i cra-bundle-analyser 
````

(cra significa create-react-app)

No `package.json`

````json
"analyzer": "npm run build && npx cra-bundle-analyzer"
````

depois executa `npm run analyser`. Vai gerar um arquivo html semelhante ao do vue-analyser.




