# Definir a imagem base
FROM node:14-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar os arquivos restantes do projeto
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Expôr a porta que a aplicação utiliza
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "start"]