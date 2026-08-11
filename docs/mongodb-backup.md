# Restaurando o Backup do MongoDB

Este documento explica detalhadamente como recuperar os dados do seu MongoDB em caso de falha, utilizando o arquivo `.gz` enviado diariamente para o seu e-mail pelo GitHub Actions.

## 1. Baixar o Arquivo de Backup
Abra o seu e-mail e faça o download do anexo mais recente. O arquivo terá um nome parecido com:
`mongodb-backup-2026-08-10-03-00.archive.gz`

## 2. Instalar o MongoDB Database Tools
Para restaurar o banco, você precisa da ferramenta `mongorestore` instalada no seu computador.
- **Windows:** Baixe o instalador MSI no [site oficial do MongoDB Tools](https://www.mongodb.com/try/download/database-tools) e instale.
- **Mac (Homebrew):** `brew tap mongodb/brew` e depois `brew install mongodb-database-tools`
- **Linux (Ubuntu):** `sudo apt-get install mongodb-database-tools`

## 3. Preparar a URI do Banco de Destino
Você precisará da "Connection String" (URI) do banco de dados onde deseja jogar os dados. 
> **IMPORTANTE:** Nunca execute uma restauração automaticamente no banco de produção sem ter certeza, pois isso sobrescreverá os dados existentes!

A URI deve ser parecida com:
`mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/convite_db`

## 4. Como Executar a Restauração (`mongorestore`)

Abra o terminal na mesma pasta onde você baixou o arquivo `.gz` e execute o comando abaixo (substituindo a URI e o nome do arquivo pelos seus dados reais):

```bash
mongorestore --uri="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/convite_db" --archive=mongodb-backup-2026-08-10-03-00.archive.gz --gzip
```

### Explicação dos parâmetros:
- `--uri`: A string de conexão do seu MongoDB Atlas (ou localhost se for um banco de teste).
- `--archive`: Indica o caminho do arquivo de backup que você baixou.
- `--gzip`: Informa à ferramenta que o arquivo está compactado (pois nós o compactamos no GitHub Actions).

## 5. Restaurando em um Banco de Testes Local
Se você quiser apenas testar os dados sem risco, instale o MongoDB localmente no seu computador (ou via Docker) e execute:

```bash
mongorestore --uri="mongodb://localhost:27017/convite_db_teste" --archive=mongodb-backup-2026-08-10-03-00.archive.gz --gzip
```
Pronto! Seus dados estão seguros e restaurados.
