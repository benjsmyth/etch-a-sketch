FROM jgwill/node:16.15

WORKDIR /app

COPY *html .
COPY *js .
COPY img .
COPY *jpg .
COPY *json .
COPY *sh .

ENTRYPOINT []
CMD http-server